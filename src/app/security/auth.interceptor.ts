import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "./login/login.service";
import { LoaderService } from '../shared/loader/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector,
                public loaderService: LoaderService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.isLoading(true);
        if(request.url.includes('http://localhost') || request.url.includes('https://www.apisolproduction.com.br/')) {   
            const loginService = this.injector.get(LoginService)
            if (loginService.isLoggedIn()) {
                const UserAux = loginService.getUser();
                const authRequest = request.clone(
                    {
                        setHeaders: {
                                    'Authorization': UserAux.token_type + ' ' + UserAux.access_token,
                                    'Content-Type': 'application/json;charset=utf-8',
                                    'Select-Account': UserAux.idselectaccount.toString()
                                }
                    }
                );
                return next.handle(authRequest).pipe(finalize(() => this.loaderService.isLoading(false)));
            } else {
                // console.log(request)
                return next.handle(request).pipe(finalize(() => this.loaderService.isLoading(false)));
            }
        } else {
            return next.handle(request).pipe(finalize(() => this.loaderService.isLoading(false)));
        }
    }
}
