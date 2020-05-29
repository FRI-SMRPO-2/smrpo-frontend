import { Pipe, PipeTransform } from '@angular/core';


function formatter(speed: number){

  if (speed < 2){
    return `${speed} točka`;
  }
  if (speed<3){
    return `${speed} točki`
  }
  if (speed<5){
    return `${speed} točke`;
  }
  return `${speed} točk`;
};

@Pipe({
  name: 'sprintSpeed'
})
export class SprintSpeedPipe implements PipeTransform {

  transform(value: number): string {
    return formatter(value);
  };
}
