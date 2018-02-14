import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './mock/in-memory-data';

import { AppComponent } from './containers/app';
import { NotFoundPageComponent } from './containers/not-found-page';
import { MaterialModule } from '../material/material.module';

import { environment } from '../../environments/environment';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,

    environment.useHttpMock
      ? HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, { delay: 1000 }
      )
      : []

  ],
  declarations: COMPONENTS,
  exports: [COMPONENTS]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
