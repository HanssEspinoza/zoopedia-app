import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnimalsService } from '@core/services';
import { material } from '@material';
import { CardComponent } from './components';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [material, CardComponent],
  template: `
    <h1>Zoopedia</h1>
    <mat-divider />

    <div class="grid mb-8 pt-2">
      @for(animal of animalsState.animals; track animal) {
      <div class="col-12 sm:col-4 md:col-3 xl:col-2">
        <app-card [animal]="animal" />
      </div>
      }
    </div>
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
