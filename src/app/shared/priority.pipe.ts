import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "priority"
})
export class PriorityPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case "musthave":
        return "Must have";
      case "couldhave":
        return "Could have";
      case "shouldhave":
        return "Should have";
    }
  }
}
