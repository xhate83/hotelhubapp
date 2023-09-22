import { Component, Input, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core'
import { CommonModule } from '@angular/common';
import { ModeAppService } from 'src/app/core/mode-app.service';

@Component({
  selector: 'app-mode-app',
  templateUrl: './mode-app.component.html',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatRippleModule],
})
export class ModeAppComponent implements OnInit {

  @Input() size: 'lg' | 'md' |'sm' | null = null;
  lightOn!: boolean;
  private _modeAppService = inject(ModeAppService);

  ngOnInit(): void {
    this.lightOn = this._modeAppService.isLightMode();
  }

  toggleLight(): void {
    this._modeAppService.toggleTheme();
    this.lightOn = this._modeAppService.isLightMode();
  }
    
}