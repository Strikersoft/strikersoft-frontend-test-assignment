import { Component, OnInit } from '@angular/core';
import { Animal } from './models/animal.model';
import { AnimalsService } from './services/animals-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchInput: string;
  currentAnimal: Animal | null;
  animalsList: Animal[];
  animalsSorted: Animal[];
  errorMessage: string;

  constructor (private service: AnimalsService) {
    this.currentAnimal = null;
    this.errorMessage = null;
    this.searchInput = '';
  }

  filterBy(text: string) {
    if (text && text !== '') {
      this.animalsSorted = this.animalsList.filter(item => item.name.includes(text));
    } else {
      this.animalsSorted = this.animalsList;
    }

    this.currentAnimal = this.animalsSorted[0] || null;
  }

  onSearchInput(text: string) {
    this.filterBy(text);
  }

  onAnimalSelect(animal?: Animal) {
    this.currentAnimal = animal;
  }

  ngOnInit() {
    this.service.getAnimals()
      .subscribe(
        animals => {
          this.animalsList = animals;
          this.animalsSorted = this.animalsList;
          // Initially select first in list
          this.onAnimalSelect(this.animalsList[0]);
        },
        error => this.errorMessage = <any>error
      );
  }
}
