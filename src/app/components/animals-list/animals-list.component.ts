import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'app-animals-list',
  templateUrl: 'animals-list.component.html',
  styleUrls: ['animals-list.component.css']
})
export class AnimalsListComponent {
  @Output() onSelect = new EventEmitter<Animal>();
  @Input() animals: Animal[];

  constructor() { }

  onAnimalSelect(animal: Animal) {
    this.onSelect.emit(animal);
  }
}
