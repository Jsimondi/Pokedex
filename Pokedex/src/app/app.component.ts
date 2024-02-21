import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from './services/poke-api.service';
import { Pokemon } from './models/pokemon-models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = 'Pokedex';
  limit: number = 10;
  offset: number = 0;
  typeLimit: number = 160;
  typeOffset: number = 146;
  pokemonsToShow: Pokemon[] = [];

  constructor(private pokemonService: PokeAPIService) {}

  ngOnInit() {
    this.pokemonService
      .getPokemons(this.offset, this.limit)
      .subscribe((res: Pokemon[]) => {
        console.log('res:', res);
        this.pokemonsToShow = res;
      });

    this.pokemonService
      .getPokemonByType('grass', this.typeOffset, this.typeLimit)
      .subscribe(res => {
        console.log('tipo grama:', res);
      });
  }
}
