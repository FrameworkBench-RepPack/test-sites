import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";
import liveData from "../assets/liveData.json" with { type: "json" };

@Component({
  selector: "app-live",
  standalone: true,
  template: `
    <table id="live-data">
      <tbody>
        <tr>
          <td>{{ liveData[index]?.[0] }}</td>
          <td>{{ liveData[index]?.[1] }}</td>
          <td>{{ liveData[index]?.[2] }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
      #live-data {
        width: 100%;
        text-align: center;
        font-size: 2em;
      }

      #live-data td {
        height: 3.5em;
        border: 0.08em solid black;
        background-color: var(--color-secondary);
      }
    `,
  ],
})
export class LiveComponent implements OnInit, OnDestroy {
  private readonly INTERVAL = 1000;
  protected index = 0;
  protected readonly liveData = liveData;
  private timeoutId?: ReturnType<typeof setTimeout>;
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    // Avoid starting the repeating timer during SSR; otherwise Zone will never stabilize and the page won't render.
    if (isPlatformBrowser(this.platformId)) {
      this.stepData();
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private stepData(): void {
    this.index = (this.index + 1) % (this.liveData.length - 1);
    this.timeoutId = setTimeout(() => this.stepData(), this.INTERVAL);
  }
}
