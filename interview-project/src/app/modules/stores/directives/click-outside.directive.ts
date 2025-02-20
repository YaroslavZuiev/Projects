import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  @Input('appHideOnClickOutside') public isElementShown: boolean;
  @Input() public isElementClicked: boolean;

  @Output() public onClickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    const isClickedOutside = !this.elementRef.nativeElement.contains(targetElement);

    if (this.isElementClicked && targetElement && isClickedOutside && this.isElementShown) {
      this.onClickOutside.emit();
    }

    this.isElementClicked = true;
  }
}
