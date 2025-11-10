import { Component, Input } from "@angular/core";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [],
  template: `
    <div class="details" [class.open]="open">
      <button class="summary" (click)="toggle()">{{ summary }}</button>
      @if (open) {
        <div class="contents">
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .details {
        margin: 1.5em 0.5em;
        padding: 0.5em;
        background-color: var(--color-secondary);
        box-shadow: var(--drop-shadow-large);

        &.open .summary::before {
          content: "▼";
        }
      }
      .summary {
        margin: 0.2em;
        font-size: 1.1em;
        appearance: none;
        border: none;
        background: none;
        cursor: pointer;

        &::before {
          content: "▶";
          margin-right: 0.8em;
        }
      }
      .contents {
        margin: 0.2em;
      }
    `,
  ],
})
export class DetailsComponent {
  @Input() summary: string = "";
  open: boolean = false;

  toggle(): void {
    this.open = !this.open;
  }
}
