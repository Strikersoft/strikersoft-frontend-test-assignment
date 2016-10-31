import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'app-animal-preview',
  templateUrl: 'animal-preview.component.html',
  styleUrls: ['animal-preview.component.css']
})
export class AnimalPreviewComponent implements OnInit {
  animal:Subject<Animal | null> = new BehaviorSubject(null);
  selectedAnimal:Animal | null;

  @Input()
  set currentAnimal(animal: Animal) {
    this.animal.next(animal);
  }

  constructor() {
    this.selectedAnimal = null;
  }

  ngOnInit() {
    this.animal.subscribe(animal => this.selectedAnimal = animal);
  }
}
