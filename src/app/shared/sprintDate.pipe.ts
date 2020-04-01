import { Pipe, PipeTransform } from '@angular/core';


function formatter(date: Date){
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let year = date.getFullYear();

  return `${day}. ${month}. ${year}`;
};

@Pipe({
  name: 'sprintDate'
})
export class SprintDatePipe implements PipeTransform {

  transform(value: string): string {
    let date = new Date(value);

    return formatter(date);
  };
}
