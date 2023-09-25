import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlurCardDirective } from './directives/blur-card.directive';
import { GridCardDirective } from './directives/grid-card.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BlurCardDirective, GridCardDirective],
  imports: [CommonModule, MatSnackBarModule, MatDialogModule],
  exports: [BlurCardDirective, GridCardDirective, MatSnackBarModule, MatDialogModule]
})
export class SharedModule {}