import { Component, inject, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatButtonModule],
})
export class ConfirmationComponent {

  dialogRef = inject(MatDialogRef<ConfirmationComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public text: string = '')
  {}
 
}
