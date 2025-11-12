import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LinksComponent } from "../lib/components/Links.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, LinksComponent],
  template: `
    <router-outlet />
    <footer>
      <div id="footer-content">
        <a [href]="'/'" id="footer-logo">Test site</a>
        <ul class="footer-links">
          <app-links></app-links>
        </ul>
        <blockquote>
          Sed blandit est nec quam vulputate, id vulputate ipsum scelerisque.
          Etiam in elit ornare, fermentum nisl vel, gravida ipsum.
        </blockquote>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        width: 100%;
        padding: 0 var(--page-padding);
        box-shadow: var(--drop-shadow-small);
        background-color: var(--color-tertiary);

        & #footer-content {
          display: flex;
          justify-content: space-around;
          align-items: center;
          max-width: var(--page-width);
          margin-left: auto;
          margin-right: auto;
          padding: var(--page-padding);
          gap: 2em;

          & #footer-logo {
            text-decoration: none;
            margin: 0;
            font-size: 3rem;
          }

          & blockquote {
            width: 19rem;
          }

          & ul.footer-links {
            list-style: disc;
            list-style-position: inside;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
          }
        }
      }
    `,
  ],
})
export class AppComponent {}
