import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: 'search-bar.component.html',
  styleUrls: ['search-bar.component.css']
})
export class SearchBarComponent {
  @Output() onSearchInput = new EventEmitter<string>();

  constructor() { }

  onInput(text: string) {
    this.onSearchInput.emit(text);
  }
}
