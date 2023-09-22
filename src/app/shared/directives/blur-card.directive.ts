import { Directive, Renderer2, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appBlurCard]'
})
export class BlurCardDirective {

  private _el = inject(ElementRef);
  private _renderer2 = inject(Renderer2);

  constructor() {
    this.setStyles();
  }

  private setStyles(): void {
    const classes = [
      'p-2', 'sm:p-6', 'backdrop-blur-sm', 'bg-white/30', 'dark:bg-gray-900/30', 'rounded-lg', 'shadow-md'
    ];

    classes.forEach(cls => {
      this._renderer2.addClass(this._el.nativeElement, cls);
    });
  }

}
