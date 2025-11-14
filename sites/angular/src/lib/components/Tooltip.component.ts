import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  template: `
    <button
      class="tooltip"
      [class.clicked]="clicked()"
      (click)="clicked.set(!clicked())"
      (mouseenter)="hovered.set(true)"
      (mouseleave)="hovered.set(false)"
    >
      <p>?</p>
    </button>
    @if (open()) {
      <div class="contents">
        <ng-content></ng-content>
      </div>
    }
  `,
  styles: [
    `
      .tooltip {
        --size: 1.5em;

        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        border: 0.1em solid black;
        border-radius: 100%;
        width: var(--size);
        height: var(--size);
        background-color: var(--color-secondary);

        &.clicked {
          background-color: var(--color-tertiary);
        }

        & p {
          margin: 0;
          padding: 0;
          font-size: 0.9em;
        }
      }
      .contents {
        --width: 40rem;
        position: absolute;
        left: calc(50vw - calc(var(--width) / 2));
        width: var(--width);
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
  clicked = signal(false);
  hovered = signal(false);
  open = computed(() => this.clicked() || this.hovered());
}
