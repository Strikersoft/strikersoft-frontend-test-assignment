import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: 'search-bar.component.html',
  styleUrls: ['search-bar.component.css']
})
export class SearchBarComponent {
  @Input() searchText:string = '';
  @Output() onSearchInput = new EventEmitter<string>();

  @Output() onSortByName = new EventEmitter<boolean>();
  @Output() onSortByAge = new EventEmitter<boolean>();
  @Output() onSortReset = new EventEmitter<boolean>();

  constructor() { }

  onInput(text: string) {
    this.onSearchInput.emit(text);
  }

  onByName() {
    this.onSortByName.emit(true);
  }

  onByAge() {
    this.onSortByAge.emit(true);
  }

  onReset() {
    this.searchText = '';
    this.onInput('');
    this.onSortReset.emit(true);
  }
}
