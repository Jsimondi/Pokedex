import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { Pokemon } from '../models/pokemon-models';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  offset: number = 0;
  limit: number = 10;
  typeOffset: number = 0;
  //typeLimit: number = 10;
  searchFor: "regular" | "type" = "regular";
  pokemonsToShow: Pokemon[] = [];
  type: string = "";

  constructor(
    private pokemonService: PokeAPIService
  ) {}

  ngOnInit(): void {
    this.getPokemons()
  }

  getPokemons() {
    switch(this.searchFor) {
      case "regular":
        this.pokemonService.getPokemons(this.offset, this.limit).subscribe((res: Pokemon[]) => {
          this.pokemonsToShow.push(...res)
          console.log("Pokemons to show: ", this.pokemonsToShow)
        })
        break;
      case "type":
        this.pokemonService.getPokemonByType(this.type, this.typeOffset, this.limit).subscribe((res: Pokemon[]) => {
          this.pokemonsToShow.push(...res)
          console.log("Pokemons to show: ", this.pokemonsToShow)
        })
      }
  }

  onScroll(): void {
    console.log("scrolled");
    this.offset += 10;
    this.typeOffset += 10;
    this.getPokemons();
  }
}
