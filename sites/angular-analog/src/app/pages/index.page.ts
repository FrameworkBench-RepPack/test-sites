import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  template: `
    <h2>Analog</h2>

    <h3>The fullstack meta-framework for Angular!</h3>

    <p class="read-the-docs">
      <a href="https://analogjs.org" target="_blank">Docs</a> |
      <a href="https://github.com/analogjs/analog" target="_blank">GitHub</a> |
      <a href="https://github.com/sponsors/brandonroberts" target="_blank">
        Sponsor
      </a>
    </p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .read-the-docs > * {
      color: #910a0aff;
    }

    @media (prefers-color-scheme: light) {
      .read-the-docs > * {
        color: #3f9006ff;
      }
    }
  `,
})
export default class HomeComponent {}
