import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluationRecordComponent } from './evaluation/evaluation-record/evaluation-record.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { LoggedInGuard } from './security/loggedin.guard';
import { LoginComponent } from './security/login/login.component';
import { TestBrokerComponent } from './evaluation/test-broker/test-broker.component';
import { EvaluationListComponent } from './evaluation/evaluation-list/evaluation-list.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canLoad: [LoggedInGuard], canActivate: [LoggedInGuard]},
  {path: 'evaluation-broker', component: TestBrokerComponent, canLoad: [LoggedInGuard], canActivate: [LoggedInGuard], data: {permission: 1}},
  {path: 'evaluation', component: EvaluationListComponent, canLoad: [LoggedInGuard], canActivate: [LoggedInGuard], data: {permission: 1}},
  {path: 'evaluation-record', component: EvaluationRecordComponent, canLoad: [LoggedInGuard], canActivate: [LoggedInGuard], data: {permission: 2}},
  {path: '**', redirectTo: '/404'},
  {path: '404', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
