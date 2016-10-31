import { Component } from '@angular/core';
import { Animal } from './models/animal.model';

/**
 * TODO: should not be here as far as i understand. Need to check NG2 best practices
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchInput: string;
  currentAnimal: Animal | null;

  constructor () {
    this.currentAnimal = null;
    this.searchInput = '';
  }

  onSearchInput(text: string) {
    this.searchInput = text;
  }

  onAnimalSelect(animal?: Animal) {
    this.currentAnimal = animal;
  }
}
