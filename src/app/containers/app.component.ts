import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal.model';
import { AnimalsService } from '../services/animals-service.service';

enum sortType {
  asc,
  desc,
  none
}

interface sortParams {
  byName: sortType,
  byAge: sortType
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  currentAnimal: Animal | null;
  animalsList: Animal[];
  animalsFiltered: Animal[];

  sortParams: sortParams;

  searchInput: string;
  errorMessage: string;

  constructor (private service: AnimalsService) {
    this.currentAnimal = null;
    this.errorMessage = null;
    this.searchInput = '';

    this.sortParams = {
      byName: sortType.none,
      byAge: sortType.none
    }
  }

  filterBy(text: string) {
    if (text && text !== '') {
      this.animalsFiltered = this.animalsList.filter(item => item.name.includes(text));
    } else {
      this.animalsFiltered = this.animalsList;
    }

    this.applySort();
    this.selectFirstAnimal();
  }

  onSortByAge() {
    this.sortParams.byAge = this.sortParams.byAge === sortType.desc ? sortType.asc : sortType.desc;
    this.sortParams.byName = sortType.none;
    this.applySort();
    this.selectFirstAnimal();
  }

  onSortByName() {
    this.sortParams.byName = this.sortParams.byName === sortType.desc ? sortType.asc : sortType.desc;
    this.sortParams.byAge = sortType.none;
    this.applySort();
    this.selectFirstAnimal();
  }

  onFiltersReset() {
    this.animalsFiltered = this.animalsList;
    this.selectFirstAnimal();
  }

  applySort() {
    this.animalsFiltered = this.sortAnimalsBy('name', this.sortParams);
    this.animalsFiltered = this.sortAnimalsBy('age', this.sortParams);
  }

  sortAnimalsBy(by: 'age' | 'name', sortParams: sortParams) {
    if (by === 'age') {
      if (sortParams.byAge === sortType.none) {
        return this.animalsFiltered;
      }

      return this.animalsFiltered.slice().sort((a:Animal, b:Animal) => {
        if (sortParams.byAge === sortType.asc) {
          return a.age > b.age ? 1 : -1;
        }
        return a.age < b.age ? 1 : -1
      })
    }

    if (by === 'name') {
      if (sortParams.byName === sortType.none) {
        return this.animalsFiltered;
      }

      return this.animalsFiltered.slice().sort((a:Animal, b:Animal) => {
        if (sortParams.byName === sortType.asc) {
          return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name)
      });
    }
  }

  selectFirstAnimal() {
    this.onAnimalSelect(this.animalsFiltered[0] || null);
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
        (animals) => {
          this.animalsList = animals;
          this.animalsFiltered = this.animalsList;
          this.selectFirstAnimal();
        },
        (error) => this.errorMessage = <any>error
      );
  }
}
