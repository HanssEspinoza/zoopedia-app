import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnimalsService } from '@core/services';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [],
  template: `
    <ul>
      @for(animal of animalsState.animals; track animal) {
      <li>
        {{ animal.name }}
      </li>
      }
    </ul>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent {
  #animalsService = inject(AnimalsService);

  get animalsState() {
    return this.#animalsService.animalsState();
  }

  ngOnInit() {
    this.#loadAnimals();
  }

  #loadAnimals() {
    this.#animalsService.getAnimals();
  }
}
