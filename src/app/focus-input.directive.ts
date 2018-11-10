import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: 'input[type=text]'
})
export class FocusInputDirective implements AfterViewInit {
  private firstTime = true;
  constructor(public elem: ElementRef) {
  }

  ngAfterViewInit() {
    if (this.firstTime) {
      setTimeout(function() {
      this.elem.nativeElement.focus();
      this.firstTime = false;
      }.bind(this), 0);
    }
  }
}