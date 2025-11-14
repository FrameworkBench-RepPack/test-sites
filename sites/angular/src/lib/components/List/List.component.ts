import { Component, signal, input, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { listCategories } from '../../assets/listCategory';
import { ListItem } from '../../assets/list-item.model';

@Component({
  selector: 'component-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './List.component.html',
  styleUrl: './List.component.css',
})
export class ListComponent {
  listData = input.required<ListItem[]>();
  sticky = input<boolean>(false);

  sortOptions = new Map<string, string>([
    ['name', 'Name'],
    ['age', 'Age'],
    ['category', 'Category'],
  ]);

  sortOption = signal('name');
  ageFrom = signal(0);
  ageTo = signal(100);
  categories = signal<number[]>([...listCategories.keys()]);
  listCategories = listCategories;

  filteredList = computed(() => {
    return this.listData()
      .filter(
        (candidate) =>
          candidate.age >= this.ageFrom() &&
          candidate.age <= this.ageTo() &&
          this.categories().includes(candidate.category),
      )
      .sort((a, b) => {
        switch (this.sortOption()) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'age':
            return a.age - b.age;
          case 'category':
            return a.category - b.category;
          default:
            throw TypeError('Unknown option');
        }
      });
  });

  sortOptionsArray = Array.from(this.sortOptions.entries());
  categoriesArray = Array.from(listCategories.entries());

  // Needed to UI
  toggleCategory(key: number, checked: boolean) {
    const current = this.categories();
    if (checked) {
      this.categories.set([...current, key]);
    } else {
      this.categories.set(current.filter((c) => c !== key));
    }
  }

  isCategoryChecked(key: number): boolean {
    return this.categories().includes(key);
  }
}
