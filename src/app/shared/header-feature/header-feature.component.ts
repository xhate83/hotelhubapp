import { Component, Input} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-feature',
  templateUrl: './header-feature.component.html',
  standalone: true,
  imports: [CommonModule, MatIconModule, SharedModule],
})
export class HeaderFeatureComponent {

  @Input() title: string = '';
  @Input() icon: string | null = null;
    
}