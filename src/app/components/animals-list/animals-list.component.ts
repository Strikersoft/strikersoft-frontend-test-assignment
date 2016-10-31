import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnimalsService } from '../../services/animals-service.service';
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'app-animals-list',
  templateUrl: 'animals-list.component.html',
  styleUrls: ['animals-list.component.css']
})
export class AnimalsListComponent implements OnInit {
  @Output() onSelect = new EventEmitter<Animal>();

  animals: Animal[];
  animalsSorted: Animal[];
  errorMessage: string;

  // TODO: definitely needed to search for NG2 best practices
  @Input()
  set filterBy(text: string) {
    if (text && text !== '') {
      this.animalsSorted = this.animals.filter(item => item.name.includes(text));
    } else {
      this.animalsSorted = this.animals;
    }

    if (this.animalsSorted) {
      // Change selected when filtering
      this.onSelect.emit(this.animalsSorted[0]);
    }
  }

  constructor(private service: AnimalsService) { }

  ngOnInit() { this.getHeroes(); }

  onAnimalSelect(animal: Animal) {
    this.onSelect.emit(animal);
  }

  getHeroes() {
    this.service.getAnimals()
      .subscribe(
        animals => {
          this.animals = animals;
          this.animalsSorted = this.animals;
          // Initially select first in list
          this.onSelect.emit(this.animals[0]);
        },
        error => this.errorMessage = <any>error
      );
  }
}
