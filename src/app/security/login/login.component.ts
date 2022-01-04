import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
    //formArrayExample: new FormArray([new FormControl('', [Validators.required])])
  });

  hide = true;

  welcomeMessage: string = "";
  errorUserMessage: string = "";
  failMessage: string = "";

  constructor(private loginService: LoginService,
              private notificationService: NotificationService,
              private router: Router,
              public translate: TranslateService) { 

    this.translate.get('LOGIN.WELCOME').subscribe((text:string) => {
      this.welcomeMessage = text;
    });
    this.translate.get('LOGIN.ERRORUSER').subscribe((text:string) => {
      this.errorUserMessage = text;
    });
    this.translate.get('LOGIN.FAIL').subscribe((text:string) => {
      this.failMessage = text;
    });

  }

  ngOnInit() {
    //this.loginService.logout();
  }

  login() {
      this.loginService.login(this.loginForm.value.username, this.loginForm.value.password)
                              .subscribe(user => {
                                  if (user !== undefined && user !== null) {
                                    this.router.navigate(['/'])
                                               .then(() => {
                                                  window.location.reload();
                                               });
                                  } else {
                                    this.notificationService.notify(this.failMessage);
                                  }
                                },
                                response =>{
                                  //this.notificationService.notify(response.error.error_description);
                                  this.notificationService.notify(this.errorUserMessage);
                                }
                              );

  }

}
