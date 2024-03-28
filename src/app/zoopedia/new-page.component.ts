import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AnimalsService } from '@core/services';
import { material } from '@material';
import { AnimalImagePipe } from './pipes';

@Component({
  selector: 'app-new-page',
  standalone: true,
  imports: [material, ReactiveFormsModule, AnimalImagePipe],
  template: `
    <h1>
      Editar / Agregar animal
      <small>Casuario</small>
    </h1>

    <mat-divider class="mb-2" />

    <div class="grid">
      <div class="col-12 sm:col-6">
        <mat-card>
          <mat-card-content>
            <form [formGroup]="animalForm()" (ngSubmit)="onSubmit()">
              <div class="grid">
                <mat-form-field class="col-12 sm:col-6" appearance="outline">
                  <mat-label>Nombre del Animal</mat-label>
                  <input matInput type="text" formControlName="name" required />
                </mat-form-field>
                <mat-form-field class="col-12 sm:col-6" appearance="outline">
                  <mat-label>Nombre científico</mat-label>
                  <input
                    matInput
                    type="text"
                    formControlName="scientific_name"
                    required
                  />
                </mat-form-field>
                <mat-form-field class="col-12 sm:col-6" appearance="outline">
                  <mat-label>Categoría</mat-label>
                  <mat-select required="" formControlName="category">
                    @for(category of categories(); track category) {
                    <mat-option [value]="category.id">{{
                      category.desc
                    }}</mat-option>
                    }
                  </mat-select>
                </mat-form-field>
                <mat-form-field class="col-12 sm:col-6" appearance="outline">
                  <mat-label>Región</mat-label>
                  <mat-select required="" formControlName="region">
                    @for(region of regions(); track region) {
                    <mat-option [value]="region.id">{{
                      region.desc
                    }}</mat-option>
                    }
                  </mat-select>
                </mat-form-field>
                <mat-form-field class="col-12" appearance="outline">
                  <mat-label>Estado de conservación</mat-label>
                  <mat-select required="" formControlName="conservation_status">
                    @for(status of conservationStatus(); track status) {
                    <mat-option [value]="status.id">{{
                      status.desc
                    }}</mat-option>
                    }
                  </mat-select>
                </mat-form-field>
                <mat-form-field class="col-12" appearance="outline">
                  <mat-label>Descripción</mat-label>
                  <textarea
                    formControlName="description"
                    matInput
                    required
                  ></textarea>
                </mat-form-field>
              </div>

              <div class="flex justify-content-between">
                <button mat-flat-button type="button" color="warn">
                  Borrar
                </button>
                <button mat-flat-button color="primary">Guardar</button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="col-12 sm:col-6">
        <mat-card>
          <img
            [src]="this.animalForm().value | animalImage"
            alt="Imagen del animal"
          />
        </mat-card>
      </div>
    </div>
  `,
  styles: ``,
})
export class NewPageComponent {
  #fb = inject(FormBuilder);
  #animalServices = inject(AnimalsService);

  public animalForm = signal<FormGroup>(
    this.#fb.group({
      id: [''],
      name: ['', Validators.required],
      category: ['', Validators.required],
      region: ['', Validators.required],
      conservation_status: ['', Validators.required],
      scientific_name: ['', Validators.required],
      description: ['', Validators.required],
    })
  );

  public categories = signal([
    {
      id: 'Mamífero',
      desc: 'Mamífero',
    },
    {
      id: 'Pájaro',
      desc: 'Pájaro',
    },
  ]);

  public regions = signal([
    {
      id: 'Desierto',
      desc: 'Desierto',
    },
    {
      id: 'Pradera',
      desc: 'Pradera',
    },
    {
      id: 'Templado',
      desc: 'Templado',
    },
    {
      id: 'Tropical',
      desc: 'Tropical',
    },
    {
      id: 'Tundra',
      desc: 'Tundra',
    },
  ]);

  public conservationStatus = signal([
    {
      id: 'No Evaluado',
      desc: 'No Evaluado',
    },
    {
      id: 'Preocupación menor',
      desc: 'Preocupación menor',
    },
    {
      id: 'Vulnerable',
      desc: 'Vulnerable',
    },
    {
      id: 'En peligro crítico',
      desc: 'En peligro crítico',
    },
    {
      id: 'Casi amenazada',
      desc: 'Casi amenazada',
    },
    {
      id: 'En peligro',
      desc: 'En peligro',
    },
  ]);

  onSubmit(): void {
    if (this.animalForm().invalid) return;

    this.#animalServices.addAnimal(this.animalForm().value);
  }
}
