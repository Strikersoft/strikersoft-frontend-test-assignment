import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AnimalsService } from './animals-service.service';
import { Animal } from './animal.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ AnimalsService ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  animals: Animal[];
  errorMessage: string;

  constructor (private service: AnimalsService) {}

  ngOnInit() { this.getHeroes(); }

  getHeroes() {
    this.service.getAnimals()
        .subscribe(
          animals => {
            this.animals = animals;
            console.log(animals);
          },
          error =>  this.errorMessage = <any>error);
  }
}
