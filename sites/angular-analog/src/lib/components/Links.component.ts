import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { pages } from "../assets/pages";

@Component({
  selector: "app-links",
  imports: [RouterLink],
  template: `
    @for (entry of pagesArray; track entry[0]) {
      <li>
        <a [routerLink]="entry[0]">{{ entry[1] }}</a>
      </li>
    }
  `,
  styles: [],
  standalone: true,
})
export class LinksComponent {
  pagesArray = Array.from(pages.entries());
}
