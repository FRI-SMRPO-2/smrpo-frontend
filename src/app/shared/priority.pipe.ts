import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'Must have';
      case 2:
        return 'Should have';
      case 3:
        return 'Could have';
      case 4:
        return 'Won\'t have at this time';
    }
  }
}
