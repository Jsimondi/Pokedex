import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pokemon } from 'src/app/models/pokemon-models';

@Component({
  selector: 'app-filter-selector',
  templateUrl: './filter-selector.component.html',
  styleUrls: ['./filter-selector.component.css']
})
export class FilterSelectorComponent {
  @Input() allTypes: any[] = [];
  @Output() typeEmitter = new EventEmitter;
  @Output() limitEmitter = new EventEmitter;
  filterForm: FormGroup;
  limitSelector: number[] = [10, 20, 50, 100];
  typeSelector: string[] = ["All Types"]

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      type: [],
      limit: 10
    })
  }

  ngOnInit() {

  }

  typeChange() {
    this.typeEmitter.emit(this.filterForm.value.type);
  }

  limitChange() {
    this.limitEmitter.emit(this.filterForm.value.limit);
  }
}
