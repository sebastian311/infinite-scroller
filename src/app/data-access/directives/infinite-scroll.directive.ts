import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
  @Output() scrolledToBottom = new EventEmitter<void>();

  private scrollEvent$ = new Subject<Event>();
  private initialThreshold = 100; // Initial pixel threshold from the bottom
  private loadCount = 0; // Number of times more content has been loaded

  constructor() {
    this.scrollEvent$
      .pipe(debounceTime(200)) // Adjust debounce time as necessary
      .subscribe((event) => this.checkScroll(event));
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    this.scrollEvent$.next(event);
  }

  private checkScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const scrollPosition = target.scrollHeight - target.scrollTop;
    const offsetHeight = target.offsetHeight;

    // Dynamically increase the threshold based on the number of loads
    const dynamicThreshold = this.initialThreshold + (this.loadCount * 20); // Increase threshold iteratively

    // Check if the user is within the threshold from the bottom of the element
    if (scrollPosition <= offsetHeight + dynamicThreshold) {
      this.scrolledToBottom.emit();
      this.loadCount++; // Increase load count after each load
    }
  }
}
