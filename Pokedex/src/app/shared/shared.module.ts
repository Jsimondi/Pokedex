import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { FilterSelectorComponent } from './filter-selector/filter-selector.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    SearchBarComponent,
    PokemonCardComponent,
    FilterSelectorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    SearchBarComponent,
    PokemonCardComponent,
    FilterSelectorComponent,
  ]
})
export class SharedModule { }
