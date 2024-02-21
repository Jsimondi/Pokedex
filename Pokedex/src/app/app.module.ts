import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './landing-page/components/search-bar/search-bar.component';
import { PokemonCardComponent } from './landing-page/components/pokemon-card/pokemon-card.component';
import { FilterSelectorComponent } from './landing-page/components/filter-selector/filter-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    SearchBarComponent,
    PokemonCardComponent,
    FilterSelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
