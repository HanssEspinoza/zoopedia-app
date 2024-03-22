import { Component } from '@angular/core';
import { material } from '@material';

@Component({
  selector: 'progress-spinner',
  standalone: true,
  imports: [material],
  template: `
    <mat-grid-list cols="1">
      <mat-grid-tile>
        <mat-spinner />
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styles: ``,
})
export class SpinnerComponent {}
