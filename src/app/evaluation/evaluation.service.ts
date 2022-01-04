import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/app.api';
import { GenericReturnModel } from '../shared/models/generic-return.model';
import { EvaluationStudentModel } from './models/evaluation-student.model';
import { EvaluationModel } from './models/evaluation.model';

@Injectable()
export class EvaluationService {

    constructor(private http: HttpClient){}

    GetListEvaluations(): Observable<EvaluationModel[]> {
        return this.http.get<EvaluationModel[]>(API + 'api/evaluation/GetListEvaluations');
    }

    GetSpecificEvaluation(idevaluation: number): Observable<EvaluationStudentModel[]> {
        return this.http.get<EvaluationStudentModel[]>(API + 'api/evaluation/GetEvaluationsStudent?idevaluation=' + idevaluation.toString());
    }

    PutStudentEvaluation(idevaluation: number, evaluation: EvaluationStudentModel): Observable<GenericReturnModel>{
        return this.http.put<GenericReturnModel>(API + 'api/evaluation/PutStudentGrade?idevaluation=' + idevaluation, evaluation);
    }
}