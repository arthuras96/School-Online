import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/app.api';
import { GenericReturnModel } from '../shared/models/generic-return.model';
import { LabelValueModel } from '../shared/models/label-value.model';

@Injectable()
export class HomeService {

    constructor(private http: HttpClient){}

    GetTestAny(anyParam: string): Observable<LabelValueModel[]> {
        return this.http.get<LabelValueModel[]>(API + 'GetTestAny?anyParam=' + anyParam);
    }
}