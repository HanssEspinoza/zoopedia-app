import { Component, input } from '@angular/core';

import { Animal } from '../../core/interfaces';
import { material } from '@material';
import { RouterLink } from '@angular/router';
import { AnimalImagePipe } from '@zoopedia/pipes';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [material, RouterLink, AnimalImagePipe],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ animal().name }}</mat-card-title>
        <mat-card-subtitle>{{ animal().scientific_name }}</mat-card-subtitle>
      </mat-card-header>

      <!-- TODO: Imagen -->
      <img
        mat-card-image
        [src]="animal() | animalImage"
        [alt]="animal().name"
      />

      <mat-card-content class="mt-2">
        <h4>{{ animal().category }}</h4>
        <p>
          <strong>Region</strong>
          {{ animal().region }}
        </p>
        <p>
          <strong>Estado de conservación</strong>
          {{ animal().conservation_status }}
          <br />
        </p>
      </mat-card-content>

      <mat-divider />

      <mat-card-actions>
        <button
          mat-button
          mat-raised
          color="primary"
          [routerLink]="['/dashboard/edit', animal().id]"
        >
          <mat-icon>edit</mat-icon>
          Editar
        </button>
        <span class="spacer"></span>
        <button
          mat-button
          mat-raised
          [routerLink]="['/dashboard', animal().id]"
        >
          <mat-icon>more_horiz</mat-icon>
          Más
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: ``,
})
export class CardComponent {
  public animal = input.required<Animal>();
}
