import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { EvaluationService } from '../evaluation.service';
import { EvaluationModel } from '../models/evaluation.model';

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.css']
})
export class EvaluationListComponent implements OnInit, OnDestroy {

  evaluations: EvaluationModel[] = [];

  displayedColumns: string[] = ['evaluation', 'discipline', 'count', 'actions'];

  dataSource: MatTableDataSource<EvaluationModel> = new MatTableDataSource([...this.evaluations]);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  constructor(private router: Router,
              private evaluationService: EvaluationService,
              public translate: TranslateService) {
                
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateDisciplineLang();
    });
  }

  ngOnInit(): void {
    // this.evaluations.push(
    //   {idevaluation: 1, dsevaluation: "Test Evaluation 1", groups: "EM1A, EM1B", disciplines: ["Matemática, Português"], disciplinesid: []}
    // );
    // this.evaluations.push(
    //   {idevaluation: 2, dsevaluation: "Test Evaluation 2", groups: "EF1A, EF1B", disciplines: ["Artes"], disciplinesid: []}
    // );

    this.evaluationService.GetListEvaluations().subscribe(
      evaluations => {
        this.evaluations = evaluations;
        this.updateDisciplineLang();
        this.dataSource = new MatTableDataSource([...this.evaluations]);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  updateDisciplineLang(): void {
    for(let index = 0; index < this.evaluations.length; index++) {
      this.evaluations[index].disciplines = [];
      for(let indexd = 0; indexd < this.evaluations[index].disciplinesid.length; indexd++){
        const nameTranslate = "DISCIPLINE." + this.evaluations[index].disciplinesid[indexd].value;
        this.translate.get(nameTranslate).subscribe((text:string) => {
          this.evaluations[index].disciplines.push(text);
        });
      }
    }
  }

  ngOnDestroy(): void {
    //this.translate.onLangChange.unsubscribe();
  }

  applyFilter(filterEvt: any) {
    let filterValue = filterEvt.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  } 

  openBroker(row: EvaluationModel){
    this.router.navigate(['/evaluation-broker/' + row.idevaluation], {state: {data: {evaluation: row}}});
  }
}
