import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlurCardDirective } from './directives/blur-card.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [BlurCardDirective],
  imports: [CommonModule, MatSnackBarModule],
  exports: [BlurCardDirective, MatSnackBarModule]
})
export class SharedModule {}