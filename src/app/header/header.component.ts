import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from '../security/login/login.service';
import { ColorSchemeService } from './color-scheme.service';
import { MenuItem } from './models/menu-item.model';
import { PermissionModel } from '../security/models/permission.model';
import { LabelValueModel } from '../shared/models/label-value.model';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  menuItems: MenuItem[] = [];

  currentRoute: string = "";

  pageTitle: string = "";

  languageSelected = 'pt';

  languages: LabelValueModel[] = [
    {value: 'pt', label: 'Português'},
    {value: 'en', label: 'English'}
  ];

  toggleControl = new FormControl(false);
  username: string = "";
  permissions: number[] = [];
  lastLogin: Date = new Date();

  constructor(private loginService: LoginService,
              private router: Router,
              public colorSchemeService: ColorSchemeService,
              public translate: TranslateService,
              private cookieService: CookieService) { 

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.makeMenu();
      this.updateTitlePage(this.currentRoute);
    });

    
    //this.router.events.subscribe(routeEvent => console.log(routeEvent));

    router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(event => { 
      this.currentRoute = event.url;
      this.updateTitlePage(event.url);
    });

  }

  ngOnDestroy(): void {
    this.translate.onLangChange.unsubscribe();
  }

  ngOnInit(): void {
    if(this.checkLogin()){
      let tempUser = this.loginService.getUser();
      this.permissions = JSON.parse(tempUser.permissions.toString());
      this.username = tempUser.name;
      this.lastLogin = new Date(tempUser.lastlogin);

      const tempLanguageSelected =this.cookieService.get('lang');
      if (tempLanguageSelected !== undefined && tempLanguageSelected !== null && tempLanguageSelected !== "") {
        this.languageSelected = tempLanguageSelected;
        this.translate.use(this.languageSelected);
      }
      
      if(this.colorSchemeService.currentActive() === "dark") {
        this.toggleControl.setValue(true);
      }
      
      if(localStorage.getItem('prefers-color') === "dark") {
        this.toggleControl.setValue(true);
      }

      this.toggleControl.valueChanges.subscribe(() => {
        if (this.toggleControl.value) {
          this.setTheme("dark");
        } else {
          this.setTheme("light");
        }
      });

      this.makeMenu();
    }
  }

  checkAction(toGo: string): void {
    if(toGo == "logout") {
      this.loginService.logout();
    } else {
      this.router.navigate([toGo]);
    }
  }

  checkLogin(): boolean {
    return this.loginService.isLoggedIn()
  }

  setTheme(theme: string) {
    this.colorSchemeService.update(theme);
  }

  changeLanguage(eventValue: any) {
    this.languageSelected = eventValue.value;
    this.translate.use(this.languageSelected);
    this.cookieService.set('lang', this.languageSelected, 365);
  }

  async makeMenu(): Promise<void> {
    this.menuItems = [];

    this.translate.get('HEADER.MENU.HOME').subscribe((text:string) => {
      this.menuItems.push(
        {
          label: text,
          icon: 'home',
          action: '/',
          showOnMobile: false,
          showOnTablet: false,
          showOnDesktop: true
        });
    });

    this.translate.get('HEADER.MENU.OUT').subscribe((text:string) => {
      this.menuItems.push(
        {
          label: text,
          icon: 'exit_to_app',
          action: 'logout',
          showOnMobile: true,
          showOnTablet: true,
          showOnDesktop: true
        });
    });

    try{
      if(this.permissions.findIndex(permission => permission === 1) !== -1) {
        // TEST BROKER - Only authorized accounts.
        this.translate.get('HEADER.MENU.BROKER').subscribe((text:string) => {
          this.menuItems.splice(1, 0, {
            label: text,
            icon: 'admin_panel_settings',
            action: '/evaluation',
            showOnMobile: false,
            showOnTablet: false,
            showOnDesktop: true
          });
        });
      }
    }
    catch(e){
      console.log(e);
    }
  }

  updateTitlePage(currentRoute: string) {
    const intervalTime = 500; // ms

    const interval = setInterval(() => {
      if(this.menuItems.length > 0){
        clearInterval(interval);
        this.menuItems.forEach(menuItem => {
          if(this.verifyTitle(currentRoute, menuItem.action)){
            this.pageTitle = menuItem.label
          }
        })
      }
    }, intervalTime);
  }



  verifyTitle(currentRoute: string, action: string): boolean {
    if(action === "/" && currentRoute === "/") return true;
    else {
      if(currentRoute.includes(action) && action !== "/") return true;
      else return false;
    }
  }
}
