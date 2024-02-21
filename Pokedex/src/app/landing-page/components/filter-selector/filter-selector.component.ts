import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-selector',
  templateUrl: './filter-selector.component.html',
  styleUrls: ['./filter-selector.component.css']
})
export class FilterSelectorComponent {
  @Output() filterEmitter = new EventEmitter;
  typeForm: FormGroup = new FormGroup({});
  limitSelector: number[] = [10, 20, 50, 100];
  typeSelector: string[] = ["All Types", "Bug", "Electric", "Flying", "Ice", "Rock", "Fairy", "Dark", "Fighting", "Grass", "Poison", "Steel", "Ghost", "Dragon", "Fire", "Ground", "Psychic", "Water", "Normal"]

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.typeForm = this.formBuilder.group({
      type: [],
      limit: 10
    })
  }

  ngOnInit() {

  }

  emitForm() {
    this.filterEmitter.emit(this.typeForm.value);
  }
}
