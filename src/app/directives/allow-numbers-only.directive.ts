import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appAllowNumbersOnly]'
})
export class AllowNumbersOnlyDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];

    if (allowedKeys.indexOf(event.key) === -1) {
      event.preventDefault();
    }
  }
}
