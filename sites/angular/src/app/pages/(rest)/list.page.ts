import { Component } from "@angular/core";
import { ListComponent } from "../../../lib/components/List/List.component";
import listData from "../../../lib/assets/listData.json" with { type: "json" };

@Component({
  selector: "list",
  imports: [ListComponent],
  standalone: true,
  template: `
    <h1>Filterable list</h1>
    <p>
      Nam pulvinar nisi a turpis sodales, id cursus purus malesuada. Mauris
      vestibulum mollis sapien, at ultrices arcu mollis quis. Nulla tempor nunc
      sed molestie suscipit. Aliquam egestas mollis sapien nec volutpat.
      Praesent vitae magna ut purus tristique posuere. Suspendisse eget lacus id
      nunc egestas aliquam. Sed urna urna, tristique in condimentum ac, molestie
      ac orci. Aenean lorem diam, condimentum nec nunc sed, maximus vulputate
      ante.
    </p>
    <component-list [listData]="data" [sticky]="true"> </component-list>
    <p>
      Aliquam eget nulla at ipsum elementum mattis quis ac felis. Fusce
      imperdiet quam et dui vulputate, sit amet hendrerit lorem feugiat. Donec
      convallis bibendum ex. Proin lacinia tortor eu aliquet vulputate. Nam
      euismod ultrices erat, eget euismod risus tempus sed. Curabitur eu ipsum
      sollicitudin, elementum mauris luctus, hendrerit nunc. Mauris porttitor mi
      augue, id auctor arcu condimentum nec. Aenean finibus, leo at accumsan
      sollicitudin, velit est facilisis quam, et sagittis ligula nisi at mi.
    </p>
  `,
  styles: [``],
})
export default class List {
  data = listData;
}
