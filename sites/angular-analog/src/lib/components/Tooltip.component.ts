import { Component, signal, ElementRef, HostListener } from "@angular/core";

@Component({
  selector: "app-tooltip",
  standalone: true,
  imports: [],
  template: `
    <button
      class="tooltip"
      (click)="toggle()"
      [attr.aria-expanded]="open()"
      type="button"
    >
      ?
    </button>

    @if (open()) {
      <div class="contents" role="tooltip">
        <ng-content></ng-content>
      </div>
    }
  `,
  styles: [
    `
      .tooltip {
        --size: 1.5em;

        padding: 0;
        border: 0.1em solid black;
        border-radius: 100%;
        width: var(--size);
        height: var(--size);
        background-color: var(--color-secondary);
        cursor: pointer;
      }
      .contents {
        display: block;
        position: fixed;
        max-width: 40rem;
        width: fit-content;
        height: fit-content;
        margin: auto;
        inset: 0px;
        padding: 0.5em;
        border: 0.1em solid black;
        border-radius: 0.3em;
        background-color: var(--color-secondary);
        box-shadow: var(--drop-shadow-large);
      }
    `,
  ],
})
export class TooltipComponent {
  open = signal(false);

  constructor(private el: ElementRef<HTMLElement>) {}

  toggle() {
    this.open.update((v) => !v);
  }

  @HostListener("document:click", ["$event"])
  onDocClick(ev: MouseEvent) {
    if (!this.open()) return;
    if (!this.el.nativeElement.contains(ev.target as Node)) {
      this.open.set(false);
    }
  }
}
