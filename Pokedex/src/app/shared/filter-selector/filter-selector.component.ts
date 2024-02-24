import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter-selector',
  templateUrl: './filter-selector.component.html',
  styleUrls: ['./filter-selector.component.css']
})
export class FilterSelectorComponent {
  @Input() allTypes: string[] = [];
  @Output() typeEmitter = new EventEmitter;
  @Output() limitEmitter = new EventEmitter;
  filterForm: FormGroup;
  limitSelector: number[] = [10, 20, 50, 100];

  type: string = '';
  secondaryType: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.filterForm = this.formBuilder.group({
      type1: '',
      type2: '',
      limit: 10
    })
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((queryParams: any) => {
      let params = queryParams.params;
      params["type1"] ? this.filterForm.patchValue({type1: params["type1"]}) : this.filterForm.patchValue({type1: ''});
      params["type2"] ? this.filterForm.patchValue({type2: params["type2"]}) : this.filterForm.patchValue({type2: ''});
      params["limit"] ? this.filterForm.patchValue({limit: params["limit"]}) : this.filterForm.patchValue({limit: 10});
    })
  }

  typeChange() {
    this.typeEmitter.emit(this.filterForm.value);
  }

  limitChange() {
    this.limitEmitter.emit(this.filterForm.value.limit);
  }

  isTypeSelected(type: string) {
    if ((this.filterForm.value.type1 === type) || this.filterForm.value.type2 === type ) {
      return type + '--shadow' + ' selected';
    } else {
      return '';
    }
  }

  handleTypeClick(type: string) {
    let formValue = this.filterForm.value
    if (!formValue.type2 && formValue.type1 && type != formValue.type1) {
      this.filterForm.patchValue({type2: type});
      this.typeChange();
    }
    else if (!formValue.type2 && !formValue.type1) {
      this.filterForm.patchValue({type1: type});
      this.typeChange();
    }
    else if (formValue.type1 && formValue.type2) {
      if (type === formValue.type1) {
        this.filterForm.patchValue({type1: formValue.type2, type2: ''});
        this.typeChange();
      }
      else if (type === formValue.type2) {
        this.filterForm.patchValue({type1: formValue.type1, type2: ''});
        this.typeChange();
      }
    }
  }
}
