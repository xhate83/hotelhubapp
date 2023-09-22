import { Component, OnInit, inject } from '@angular/core';
import { ModeAppService } from './core/mode-app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private _modeAppService = inject(ModeAppService);

  ngOnInit() {
    this._modeAppService.applyTheme();
  }
}
