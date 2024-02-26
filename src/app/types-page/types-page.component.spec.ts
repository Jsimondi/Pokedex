import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesPageComponent } from './types-page.component';

describe('TypesPageComponent', () => {
  let component: TypesPageComponent;
  let fixture: ComponentFixture<TypesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypesPageComponent]
    });
    fixture = TestBed.createComponent(TypesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
