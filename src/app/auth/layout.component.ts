import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `<div class="grid p-3">
    <div class="col-12 mt-5 md:col-6 md:col-offset-3 md:mt-8">
      <router-outlet />
    </div>
  </div> `,
  styles: ``,
})
export class LayoutComponent {}
