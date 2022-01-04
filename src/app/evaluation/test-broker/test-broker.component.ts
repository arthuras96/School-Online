import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageEditorComponent } from './image-editor/image-editor.component';
import { EvaluationQuestionModel } from '../models/evaluation-question.model';
import { EvaluationStudentModel } from '../models/evaluation-student.model';
import { EvaluationModel } from '../models/evaluation.model';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NotificationService } from '../../shared/messages/notification.service';
import { EvaluationService } from '../evaluation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-test-broker',
  templateUrl: './test-broker.component.html',
  styleUrls: ['./test-broker.component.css']
})
export class TestBrokerComponent implements OnInit  {
  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private evaluationService: EvaluationService,
              private router: Router,
              public translate: TranslateService) { }

  evaluations: EvaluationStudentModel[]  = [];
  evaluation: EvaluationModel = {idevaluation: 0, dsevaluation: "", groups: "", totalcount: 0, ratedcount: 0, disciplines: [], disciplinesid: []};
  selectEvaluationStudent: number = 0;
  actualPage: number = 0;

  evaluationGradeForm: FormGroup = new FormGroup({});
  grades: FormArray = new FormArray([]);

  ngOnInit(): void {
    if(history.state.data !== undefined && history.state.data !== "" && history.state.data !== null) {
      this.evaluation = history.state.data.evaluation;
      this.evaluationService.GetSpecificEvaluation(this.evaluation.idevaluation).subscribe(evaluationstudent => {
        this.evaluations = evaluationstudent;

        this.evaluationGradeForm = this.formBuilder.group({
          grades: this.formBuilder.array([], [Validators.required])
        });
    
        this.updateStudentQuestions();
      });
    } else {
      this.notificationService.notify("Não foi localizada avaliação com este código.");
      this.router.navigate(['/evaluation-broker/']);
    }
  }

  updateStudentQuestions() {
    this.grades = this.evaluationGradeForm.get('grades') as FormArray;
    while (this.grades.length !== 0) {
      this.grades.removeAt(0)
    }

    for(let indexQ = 0; indexQ < this.evaluations[this.selectEvaluationStudent].questions.length; indexQ++){
      this.addItem(this.evaluations[this.selectEvaluationStudent].questions[indexQ]);
    }
  }

  addItem(question: EvaluationQuestionModel): void {
    this.grades = this.evaluationGradeForm.get('grades') as FormArray;
    if(question.studentgrade === ''){
      this.grades.push(
        this.formBuilder.group({
          grade: ['', [Validators.required, Validators.min(0), Validators.max(question.totalrating)]]
        })
      );
    } else {
      this.grades.push(
        this.formBuilder.group({
          grade: [question.studentgrade, [Validators.required, Validators.min(0), Validators.max(question.totalrating)]]
        })
      );
    }

  }

  saveGrades() {
    let countResponse = this.evaluationGradeForm.get('grades')?.value.length;
    for(let indexCR = 0; indexCR < countResponse; indexCR++){
      this.evaluations[this.selectEvaluationStudent].questions[indexCR].studentgrade = this.evaluationGradeForm.get('grades')?.value[indexCR].grade;
    }

    this.evaluationService.PutStudentEvaluation(this.evaluation.idevaluation, this.evaluations[this.selectEvaluationStudent]).subscribe(
      statusReturn => {
        if(statusReturn.statuscode === 201) {
          this.translate.get('TESTBROKER.SAVESUCCESS').subscribe((text:string) => {
            this.notificationService.notify(text);
          });
        } else {
          this.translate.get('TESTBROKER.SAVEERROR').subscribe((text:string) => {
            this.notificationService.notify(text);
          });
        }
      }
    );

    if(this.evaluations.length - 1 === this.selectEvaluationStudent) {
      this.translate.get('TESTBROKER.LASTEVALUATION').subscribe((text:string) => {
        this.notificationService.notify(text);
      });
    } else {
      this.forwardEvaluation();
    }
    // if(this.evaluations.length - 1 === this.selectEvaluationStudent) {
    //   let confirmData: ConfirmDialogModel = {title: "Enviar e-mail", message: "Deseja enviar e-mail aos alunos com as provas?"}
    //   const dialogRef = this.dialog.open
    //   (ConfirmDialogComponent, {
    //     width: '350px',
    //     data: confirmData
    //   });

    //   dialogRef.afterClosed().subscribe(
    //     result => {
    //       if(result) {
    //         this.notificationService.notify('Envio de e-mails agendado.');
    //       }
    //     }
    //   );
    // } else {
    //   this.forwardEvaluation();
    // }
  }

  backEvaluation(): void {
    this.actualPage = 0;
    this.selectEvaluationStudent = this.selectEvaluationStudent - 1;
    this.updateStudentQuestions();
  }

  forwardEvaluation(): void {
    this.actualPage = 0;
    this.selectEvaluationStudent = this.selectEvaluationStudent + 1;
    this.updateStudentQuestions();
  }

  changePage(pageNumber: number): void {
    this.actualPage = pageNumber;
  }

  openEditFrame(): void {
    const dialogRef = this.dialog.open(ImageEditorComponent, {
      maxWidth: '90%',
      minWidth: '90%',
      disableClose: false,
      data: {
        urlImage: this.evaluations[this.selectEvaluationStudent].evaluations[this.actualPage].image
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined && result !== null && result !== "") {
        this.evaluations[this.selectEvaluationStudent].evaluations[this.actualPage].image = result;
      }
    });
  }

  get evaluationGradeFormGroups () {
    return this.evaluationGradeForm.get('grades') as FormArray
  }
}
