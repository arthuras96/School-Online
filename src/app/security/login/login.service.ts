import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Observable, of, Subscriber } from 'rxjs';
import { API } from 'src/app/app.api';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoginService {

    user: User = {name: "", email: "", permissions: [], permissionsaccount: [], lastlogin: new Date, idprofile: 0, idaccounts: [], idselectaccount: 0, access_token: "", expires_in: 0, token_type: ""};
    controlBtn: boolean = false;

    constructor(private http: HttpClient,
        private router: Router,
        private cookieService: CookieService) {}
    
    login(username: string, password: string): Observable<User> {
        // Example of API REQUEST
        const httpHeaders = new HttpHeaders ({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        let grant_type = 'password';
        let body = `grant_type=${grant_type}&username=${username}&password=${password}`;

        return this.http.post<User>(API + 'api/authenticate/token', body, { headers: httpHeaders })
                        .pipe(tap(user => {
                                this.user = user;
                                if (this.user !== undefined && this.user !== null) {
                                    this.cookieService.set('User', JSON.stringify(this.user), 0.3);
                                }
                            })
                        );

        //this.user = {name: "Admin Test", email: "test@test", permissions:[{idpermission: 1, branch: "101,102,103"}], lastlogin: new Date, iduser: 1, idprofile: 1, access_token: "", expires_in: 99999, token_type: ""};
        // this.user = {name: "Admin Test", email: "test@test", permissions:[{idpermission: 1, branch: '101'}], lastlogin: new Date, iduser: 1, idprofile: 1, access_token: "", expires_in: 99999, token_type: ""};
        this.cookieService.set('User', JSON.stringify(this.user), 0.3);
        return new Observable<User>((subscriber: Subscriber<User>) => subscriber.next(this.user));
    }

    getUser(): User {
        if (this.cookieService.check('User')) {
            this.user = JSON.parse(this.cookieService.get('User'));

            if (this.user !== undefined && this.user !== null) {
                return this.user;
            } else {
                return {name: "", email: "", permissions:[], permissionsaccount: [], lastlogin: new Date, idprofile: 0, idaccounts: [], idselectaccount: 0, access_token: "", expires_in: 0, token_type: ""};
            }
        } else {
            return {name: "", email: "", permissions:[], permissionsaccount: [], lastlogin: new Date, idprofile: 0, idaccounts: [], idselectaccount: 0, access_token: "", expires_in: 0, token_type: ""};
        }
    }

    isLoggedIn(): boolean {
        if (this.cookieService.check('User')) {
            this.user = JSON.parse(this.cookieService.get('User'));
            if (this.user !== undefined && this.user !== null) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    logout() {
        this.user = {name: "", email: "", permissions:[], permissionsaccount: [], lastlogin: new Date, idprofile: 0, idaccounts: [], idselectaccount: 0, access_token: "", expires_in: 0, token_type: ""};
        this.cookieService.delete("User");
        this.router.navigate(['/login']);
    }
}