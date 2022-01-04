import { EvaluationImageModel } from "./evaluation-image.model";
import { EvaluationQuestionModel } from "./evaluation-question.model";

export interface EvaluationStudentModel {
    idstudent: number;
    idevaluationversion: number;
    dsevaluationversion: string;
    namestudent: string;
    studentphoto: string;
    sendemail: boolean;
    evaluations: EvaluationImageModel[];
    questions: EvaluationQuestionModel[];
}