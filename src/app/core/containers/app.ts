import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <mat-toolbar color="primary">
    <h1>{{ title }}</h1>
  </mat-toolbar>

  <main class="main">
    <router-outlet></router-outlet>
  </main>
  `,
  styles: []
})
export class AppComponent {
  title = 'Overkill todo !';
}
