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
  
  pokemon: Pokemon[] = [];
  pokemonToShow: Pokemon[] = [];
  typesArray = new Array()
  type: string = "normal";

  constructor(
    private pokemonService: PokeAPIService
  ) {}

  ngOnInit(): void {
    this.getAllTypes();
    this.getPokemons("regular");
  }

  getAllTypes() {
    this.pokemonService.getAllTypes().subscribe(res => {
      res.results.forEach((type: any) => {
        this.typesArray.push(type.name);
      })
    })
  }

  getPokemons(parameter: "regular" | "type") {
    switch(parameter) {
      case "regular":
        this.pokemonService.getPokemons(this.offset, this.limit).subscribe((res: Pokemon[]) => {
          this.pokemon.push(...res);
          this.pokemonToShow = this.pokemonService.filterPokemonArray(this.pokemon, this.offset, this.limit);
          console.log("Pokemons to show: ", this.pokemonToShow)
        })
        break;
      case "type":
        this.pokemonService.getPokemonByType(this.type).subscribe((res: Pokemon[]) => {
          this.pokemon = res;
          this.pokemonToShow = this.pokemonService.filterPokemonArray(this.pokemon, this.offset, this.limit);
          console.log("Pokemons to show: ", this.pokemonToShow)
        })
        break;
      }
  }

  typeChange(event: any) {
    this.type = event;
    this.getPokemons("type");
  }

  limitChange(event: any) {
    console.log("event: ", event);
    this.limit = event;
    this.getPokemons("type")
  }

  onScroll(): void {
    console.log("scrolled");
    this.offset += 10;
  }
}
