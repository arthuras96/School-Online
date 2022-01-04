import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './security/login/login.component';
import { NgxLoadingModule } from 'ngx-loading';

import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './security/login/login.service';
import { SnackbarComponent } from './shared/messages/snackbar/snackbar.component';
import { NotificationService } from './shared/messages/notification.service';
import { AuthInterceptor } from './security/auth.interceptor';
import { LoggedInGuard } from './security/loggedin.guard';
import { HomeComponent } from './home/home.component';
import { ApplicationErrorHandle } from './app-error.handler';
import { HeaderComponent } from './header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './shared/loader/loader.service';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { HomeService } from './home/home.service';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { TestBrokerComponent } from './evaluation/test-broker/test-broker.component';
import { ToastUiImageEditorModule } from 'ngx-tui-image-editor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import ptBr from '@angular/common/locales/pt';
import en from '@angular/common/locales/en';
import { DateProxyPipe } from './shared/date-proxy.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { ImageEditorComponent } from './evaluation/test-broker/image-editor/image-editor.component';
import { EvaluationRecordComponent } from './evaluation/evaluation-record/evaluation-record.component';
import { EvaluationListComponent } from './evaluation/evaluation-list/evaluation-list.component';
import { EvaluationService } from './evaluation/evaluation.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(ptBr, 'pt');
registerLocaleData(en, 'en');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SnackbarComponent,
    HomeComponent,
    HeaderComponent,
    LoaderComponent,
    ConfirmDialogComponent,
    TestBrokerComponent,
    DateProxyPipe,
    NotFoundComponent,
    ImageEditorComponent,
    EvaluationRecordComponent,
    EvaluationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      defaultLanguage: 'pt',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true
    }),
    ToastUiImageEditorModule
  ],
  providers: [
    NotificationService,
    LoaderService,
    CookieService,
    LoginService,
    HomeService,
    EvaluationService,
    LoggedInGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: ErrorHandler, useClass: ApplicationErrorHandle},
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: LOCALE_ID, useValue: window.navigator.language }
  ],
  entryComponents:[ImageEditorComponent, ConfirmDialogComponent],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
