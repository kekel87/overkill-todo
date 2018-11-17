import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>404: Not Found</mat-card-title>
      <mat-card-content>
        <p><mat-icon>location_searching</mat-icon></p>
        <p>Il n'y a rien, ici ...</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" routerLink="/">Accueil</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
    :host {
      text-align: center;
    }

    mat-icon {
      width: 60px;
      height: 60px;
      font-size: 60px;
      line-height: 60px;
    }
  `,
  ],
})
export class NotFoundPageComponent { }
