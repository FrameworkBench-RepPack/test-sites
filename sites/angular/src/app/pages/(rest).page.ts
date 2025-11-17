import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LinksComponent } from '../../lib/components/Links.component';

@Component({
  selector: 'pages-layout',
  standalone: true,
  imports: [RouterOutlet, LinksComponent],
  template: `
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">
              <img id="icon" src="/favicon.svg" alt="Front page" />
            </a>
          </li>
          <app-links></app-links>
        </ul>
      </nav>
    </header>
    <main id="page-width">
      <router-outlet />
    </main>
  `,
  styles: [
    `
      header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: var(--header-height);
        padding: 0 var(--page-padding);
        background-color: var(--color-secondary);
        box-shadow: var(--drop-shadow-small);

        & nav {
          height: 100%;
          max-width: var(--page-width);
          margin-left: auto;
          margin-right: auto;
          & > ul {
            display: flex;
            align-items: center;
            gap: 3em;
            height: 100%;
            margin: 0;
            padding: 0;
            list-style-type: none;
          }
          & > ul > app-links {
            display: contents;
          }
        }
      }
      #icon {
        height: var(--header-height);
        aspect-ratio: 1;
        padding: 1em;
      }
      #page-width {
        margin-top: var(--header-height);
        max-width: var(--page-width);
        margin-left: auto;
        margin-right: auto;
        padding: var(--page-padding);
      }
    `,
  ],
})
export default class PagesLayout {}
