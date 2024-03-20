import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, delay, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() searchEmitter = new EventEmitter();
  searchBarForm: FormGroup;
  timer: any;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.searchBarForm = this.formBuilder.group({
      search: ''
    })
  }

  ngOnInit() {
    this.searchBarForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(res => {
        this.searchPokemonEmitter()
        return of();
      })
    ).subscribe()
  }

  searchPokemonEmitter() {
    this.searchEmitter.emit(this.searchBarForm.value)
  }
}
