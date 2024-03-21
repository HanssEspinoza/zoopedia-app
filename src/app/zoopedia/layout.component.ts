import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { material } from '@material';

interface menu {
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, material, NgStyle, RouterLink],
  template: `
    <mat-sidenav-container fullscreen>
      <mat-sidenav #sidenav mode="push" [ngStyle]="{ width: '250px' }">
        <mat-toolbar>
          <span>Menu</span>
          <span class="spacer"></span>
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
        </mat-toolbar>
        <mat-nav-list>
          @for(item of sidebarItems(); track item) {
          <mat-list-item [routerLink]="item.url" (click)="sidenav.toggle()">
            <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
            {{ item.label }}
          </mat-list-item>
          }
        </mat-nav-list>
      </mat-sidenav>
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span class="spacer"></span>
        <button mat-button>Salir</button>
      </mat-toolbar>
      <div class="container p-2">
        <router-outlet />
      </div>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export class LayoutComponent {
  public sidebarItems = signal<menu[]>([
    {
      label: 'Listado',
      icon: 'label',
      url: './list',
    },
    {
      label: 'Añadir',
      icon: 'add',
      url: './new-animal',
    },
    {
      label: 'Buscar',
      icon: 'search',
      url: './search',
    },
  ]);
}
