import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'changePerc'
})
export class ChangePercPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {


    //TODO DODATI BOJE
    if (value > 0) {
      return value / 100 + '%'
    }
    return value / 100 + '%'

  }
}
