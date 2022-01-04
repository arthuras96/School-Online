import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { NotificationService } from './shared/messages/notification.service';

@Injectable()
export class ApplicationErrorHandle extends ErrorHandler {

    constructor(private injector: Injector,
                private zone: NgZone,
                private notificationService: NotificationService) {
        super()
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            const message = errorResponse.error.message
            // console.log("errorResponse ↓");
            // console.log(errorResponse);
            this.zone.run(() => {
                switch (errorResponse.status) {
                    case 403:
                        // console.log(message || 'Não autorizado.')
                        break;
                    case 404:
                        // console.log(message || 'Recurso não encontrado.')
                        break;
                    case 500:
                        this.notificationService.notify('Houve um erro na sua solicitação. Verifique os dados e tente novamente.')
                        break;
                    default:
                        // console.log(message || 'Erro não identificado.')
                }
            })
        }
        super.handleError(errorResponse)
    }
}
