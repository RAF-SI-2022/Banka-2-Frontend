import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'activityPipe'
})
export class ActivityPipe implements PipeTransform {

  activity!: string

  transform(value: unknown, ...args: unknown[]): any {

    if (value === true) {
      return "Aktivan"
    }
    return "Neaktivan";
  }

}
