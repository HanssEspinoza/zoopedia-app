import { Component, inject, signal } from '@angular/core';
import { material } from '@material';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AnimalsService } from '@core/services';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [material, ReactiveFormsModule],
  template: `
    <div class="flex flex-column p-2">
      <h3>Buscador</h3>
      <mat-form-field>
        <mat-label>Buscador de Animales</mat-label>
        <input
          type="text"
          matInput
          [formControl]="searchInput()"
          (input)="searchAnimal()"
          [matAutocomplete]="auto"
        />

        <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
          @for(animal of animals.animals; track animal) {
          <mat-option [value]="animal">
            {{ animal.name }}
          </mat-option>
          @if(animals.animals.length === 0 && searchInput().value &&
          searchInput().value.length > 0) {
          <mat-option value="">
            No se encontró nada el el termino {{ searchInput().value }}
          </mat-option>
          } }
        </mat-autocomplete>
      </mat-form-field>
    </div>
  `,
  styles: ``,
})
export class SearchPageComponent {
  #fb: FormBuilder = inject(FormBuilder);
  #AnimalsService = inject(AnimalsService);

  get animals() {
    return this.#AnimalsService.animalsState();
  }

  public searchInput = signal<FormControl>(this.#fb.control(''));

  public searchAnimal() {
    const value: string = this.searchInput().value || '';

    this.#AnimalsService.getSuggestions(value);
  }
}
