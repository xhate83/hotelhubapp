import { Directive, Renderer2, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appGridCard]'
})
export class GridCardDirective {

  private _el = inject(ElementRef);
  private _renderer2 = inject(Renderer2);

  constructor() {
    this.setStyles();
  }

  private setStyles(): void {
    const classes = [
      'text-gray-50', 'bg-cyan-700', 'dark:bg-gray-900', 'p-4', 'flex', 'flex-col', 'items-center', 'justify-between', 'rounded-lg'
    ];

    classes.forEach(cls => {
      this._renderer2.addClass(this._el.nativeElement, cls);
    });
  }

}
