import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeAppService {
  

  public isLightMode(): boolean {
    const storedTheme = localStorage.getItem('theme-mode');
    if (storedTheme) {
      return storedTheme === 'light';
    } else {
      return !window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  }

  public toggleTheme(): void {
    if (this.isLightMode()) {
      document.body.classList.add('dark');
      localStorage.setItem('theme-mode', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme-mode', 'light');
    }
  }

  public applyTheme(): void {
    if (this.isLightMode()) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  }
}