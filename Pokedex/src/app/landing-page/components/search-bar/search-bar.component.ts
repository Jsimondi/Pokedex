import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() searchEmitter = new EventEmitter();

  constructor(
  ) {}

  ngOnInit() {

  }

  searchPokemonEmitter() {
    this.searchEmitter.emit()
  }
}
