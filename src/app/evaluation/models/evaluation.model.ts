import { LabelValueModel } from "src/app/shared/models/label-value.model";

export interface EvaluationModel {
    idevaluation: number;
    dsevaluation: string;
    groups: string;
    totalcount: number;
    ratedcount: number;
    disciplines: string[];
    disciplinesid: LabelValueModel[];
}