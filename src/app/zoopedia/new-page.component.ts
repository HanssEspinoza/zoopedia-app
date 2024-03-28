import { Component, signal } from '@angular/core';
import { material } from '@material';

@Component({
  selector: 'app-new-page',
  standalone: true,
  imports: [material],
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
            <div class="grid">
              <mat-form-field class="col-12 sm:col-6" appearance="outline">
                <mat-label>Nombre del Animal</mat-label>
                <input matInput type="text" required />
              </mat-form-field>
              <mat-form-field class="col-12 sm:col-6" appearance="outline">
                <mat-label>Nombre científico</mat-label>
                <input matInput type="text" required />
              </mat-form-field>
              <mat-form-field class="col-12 sm:col-6" appearance="outline">
                <mat-label>Categoría</mat-label>
                <mat-select required="">
                  @for(category of categories(); track category) {
                  <mat-option [value]="category.id">{{
                    category.desc
                  }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
              <mat-form-field class="col-12 sm:col-6" appearance="outline">
                <mat-label>Región</mat-label>
                <mat-select required="">
                  @for(region of regions(); track region) {
                  <mat-option [value]="region.id">{{ region.desc }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
              <mat-form-field class="col-12" appearance="outline">
                <mat-label>Estado de conservación</mat-label>
                <mat-select required="">
                  @for(status of conservationStatus(); track status) {
                  <mat-option [value]="status.id">{{ status.desc }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
              <mat-form-field class="col-12" appearance="outline">
                <mat-label>Descripción</mat-label>
                <textarea matInput required></textarea>
              </mat-form-field>
            </div>

            <div class="flex justify-content-between">
              <button mat-flat-button color="warn">Borrar</button>
              <button mat-flat-button color="primary">Guardar</button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="col-12 sm:col-6">
        <mat-card>
          <img src="" alt="Imagen del animal" />
        </mat-card>
      </div>
    </div>
  `,
  styles: ``,
})
export class NewPageComponent {
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
}
