import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'date',
  pure: false
})
export class DateProxyPipe implements PipeTransform {
 
  constructor(private translateService: TranslateService) {}
 
  public transform(value: any, pattern: string = 'mediumDate'): any {
    const ngPipe = new DatePipe(this.translateService.currentLang);
    return ngPipe.transform(value, pattern);
  }
}