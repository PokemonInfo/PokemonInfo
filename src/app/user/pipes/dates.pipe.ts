import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dates'
})
export class DatesPipe implements PipeTransform {

  date;
  constructor(
    private datePipe:DatePipe
  ){
      this.date = this.datePipe.transform( new Date(),'yyyy-MM-dd');
  }

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
