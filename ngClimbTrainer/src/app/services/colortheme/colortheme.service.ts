import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorthemeService {
private isDarkMode = false;

  constructor() { }

  toggleTheme(): void{
    this.isDarkMode = !this.isDarkMode;

    if(this.isDarkMode){
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    }else{
      document.documentElement.setAttribute('data-bs-theme', 'light')
    }
  }

}
