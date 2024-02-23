import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { Pokemon } from '../models/pokemon-models';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { of, switchMap, throwError } from 'rxjs';

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
  pokemonToShow: (Pokemon | null)[] = [];
  typesArray: string[] = []
  type: string = "";
  secondaryType: string | null = null;

  constructor(
    private pokemonService: PokeAPIService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pokemonService.getAllTypes().subscribe(types => {
      types.results.forEach((type: any) => {
        this.typesArray.push(type.name);
      })
      console.log("Snapshot: ", this.activatedRoute.snapshot)
      this.setTypes(this.activatedRoute.snapshot.queryParams);
      this.checkIfTypesExist();
      this.getPokemons();
    })
  }

  getPokemons() {
    this.pokemonService.getPokemonByType(this.type).subscribe((res: Pokemon[]) => {
      this.pokemon = res;
      this.pokemonToShow = this.pokemonService.limitPokemonArray(this.pokemon, this.offset, this.limit);
      console.log("Pokemons to show: ", this.pokemonToShow)
    })
  }

  checkIfTypesExist() {
    if (!this.type) {
      console.log("caiu no primeiro if")
      this.router.navigate([``]);
    }
    else if (this.type && !this.typesArray.includes(this.type)) {
      console.log("caiu no primeiro else if")
      this.router.navigate([``]);
    }
    else if (this.type && !this.secondaryType) {
      console.log("caiu no segundo else if")
      this.router.navigate([`types`], {queryParams: {type1: this.type, limit: this.limit}});
      this.type = this.type;
      this.secondaryType = null;
      this.getPokemons();
    }
    else if (this.type && this.secondaryType && !this.typesArray.includes(this.secondaryType)) {
      console.log("caiu no terceiro else if")
      this.router.navigate([`/types`], {queryParams: {type1: this.type, limit: this.limit}});
      this.secondaryType = null;
      this.getPokemons();
    }
  }

  setTypes(params: Params) {
    this.type = params["type1"];
    params["type2"] ? this.secondaryType = params["type2"] : this.secondaryType = null;
    if (this.secondaryType) {
      this.pokemonToShow = this.pokemonService.filterPokemonArrayByTypes(this.pokemon, this.type, this.secondaryType);
    }
    params["limit"] ? this.limit = params["limit"] : this.limit = 10;
  }

  clickedNewType(event: string) {
    if (event != this.type) {
      this.type = event;
    }
    this.router.navigate([`types`], {queryParams: { type1: this.type, limit: this.limit }})
    this.getPokemons()
  }

  typeChange(event: string) {
    this.secondaryType = event;
    this.router.navigate([`types`], {queryParams: { type1: this.type, type2: this.secondaryType, limit: this.limit }})
    this.pokemonToShow = this.pokemonService.filterPokemonArrayByTypes(this.pokemon, this.type, this.secondaryType);
  }

  limitChange(event: any) {
    console.log("event: ", event);
    this.limit = event;
    this.pokemonToShow = this.pokemonService.limitPokemonArray(this.pokemon, this.offset, this.limit);
  }

  searchPokemon(searchTerm: {search: string}) {
    let searchArray: Pokemon[] = [];
    this.pokemon.forEach((pokemon: Pokemon) => {
      if (pokemon.name.includes(searchTerm.search)) {
        searchArray.push(pokemon);
      }
    })
    this.pokemonToShow = searchArray;
  }

  next() {
    if (this.offset + this.limit > this.pokemon.length) {
      this.pokemonToShow = this.pokemonService.limitPokemonArray(this.pokemon, this.offset, this.pokemon.length)
    } else {
      this.offset += this.limit;
      this.pokemonToShow = this.pokemonService.limitPokemonArray(this.pokemon, this.offset, this.limit)
    }
  }

  back() {
    if (this.offset - this.limit < 0) {
      this.pokemonToShow = this.pokemonService.limitPokemonArray(this.pokemon, 0, this.limit)
    } else {
      this.offset -= this.limit;
      this.pokemonToShow = this.pokemonService.limitPokemonArray(this.pokemon, this.offset, this.limit)
    }
  }

  onScroll(): void {
    console.log("scrolled");
    this.offset += 10;
  }
}
