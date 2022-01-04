import { Component, HostBinding } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event as RouterEvent, } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { ColorSchemeService } from './header/color-scheme.service';
import { LoaderService } from './shared/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SOL - School Online';

  constructor(private colorSchemeService: ColorSchemeService,
              public loaderService: LoaderService,
              public translate: TranslateService,
              private router: Router,
              private cookieService: CookieService) {

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    });

    const tempLanguageSelected = this.cookieService.get('lang');
    
    this.colorSchemeService.load();

    translate.addLangs(['pt', 'en']);
    translate.setDefaultLang('pt');
    const browserLang = translate.getBrowserLang();
    if(tempLanguageSelected === "" || tempLanguageSelected === null || tempLanguageSelected === undefined) {
      translate.use(browserLang.match(/pt|en/) ? browserLang : 'pt');
    } else {
      translate.use(tempLanguageSelected);
    }
    //translate.use(browserLang.match(/pt|en/) ? browserLang : 'pt');
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loaderService.isLoading(true);
    }
    if (event instanceof NavigationEnd) {
      this.loaderService.isLoading(false);
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
        this.loaderService.isLoading(false);
    }
    if (event instanceof NavigationError) {
        this.loaderService.isLoading(false);
    }
  }
}
