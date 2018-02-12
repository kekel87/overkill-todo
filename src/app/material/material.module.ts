import { NgModule } from '@angular/core';

import {
  // Form Controls
  // MatAutocompleteModule,
  // MatCheckboxModule,
  // MatDatepickerModule,
  // MatFormFieldModule,
  // MatInputModule,
  // MatRadioModule,
  // MatSelectModule,
  // MatSliderModule,
  // MatSlideToggleModule,

  // Navigation
  // MatMenuModule,
  // MatSidenavModule,
  MatToolbarModule,

  // Layout
  // MatCardModule,
  // MatDividerModule,
  // MatExpansionModule,
  // MatGridListModule,
  // MatListModule,
  // MatStepperModule,
  // MatTabsModule,

  // Bouttons & indicators
  // MatButtonModule,
  // MatButtonToggleModule,
  // MatChipsModule,
  // MatIconModule,
  // MatProgressSpinnerModule,
  // MatProgressBarModule,

  // Popups & Modals
  // MatDialogModule,
  // MatSnackBarModule,
  // MatTooltipModule,

  // Data table
  // MatTableModule,
  // MatSortModule,
  // MatPaginatorModule

} from '@angular/material';

export const MATERIAL_MODULES = [
  // Form Controls
  // MatAutocompleteModule,
  // MatCheckboxModule,
  // MatDatepickerModule,
  // MatFormFieldModule,
  // MatInputModule,
  // MatRadioModule,
  // MatSelectModule,
  // MatSliderModule,
  // MatSlideToggleModule,

  // Navigation
  // MatMenuModule,
  // MatSidenavModule,
  MatToolbarModule,

  // Layout
  // MatCardModule,
  // MatDividerModule,
  // MatExpansionModule,
  // MatGridListModule,
  // MatListModule,
  // MatStepperModule,
  // MatTabsModule,

  // Bouttons & indicators
  // MatButtonModule,
  // MatButtonToggleModule,
  // MatChipsModule,
  // MatIconModule,
  // MatProgressSpinnerModule,
  // MatProgressBarModule,

  // Popups & Modals
  // MatDialogModule,
  // MatSnackBarModule,
  // MatTooltipModule,

  // Data table
  // MatTableModule,
  // MatSortModule,
  // MatPaginatorModule
];

@NgModule({
  imports: [MATERIAL_MODULES],
  exports: [MATERIAL_MODULES],
})
export class MaterialModule { }
