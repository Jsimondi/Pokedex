import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { Pokemon } from '../models/pokemon-models';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { of, switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnChanges {
  offset: number = 0;
  limit: number = 10;

  loading: boolean = true;
  
  pokemon: Pokemon[] = [];
  pokemonToShow: Pokemon[] = [];
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
      this.setTypes(this.activatedRoute.snapshot.queryParams);
      this.checkIfTypesExist();
      this.getPokemons();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes: ", changes)
  }

  getPokemons() {
    this.loading = true;
    this.pokemonService.getPokemonByType(this.type).subscribe((res: Pokemon[]) => {
      this.pokemon = res;
      this.pokemonToShow = this.pokemonService.filterPokemonArrayByTypes(this.pokemon, this.type, this.secondaryType ? this.secondaryType : '');
      this.pokemonToShow = this.pokemonService.limitPokemonArray(this.pokemonToShow, this.offset, this.limit);
      this.loading = false;
      console.log("pokemons: ", this.pokemon);
      console.log("pokemonToShow: ", this.pokemonToShow);
    })
  }

  checkIfTypesExist() {
    if (!this.type) {
      this.router.navigate([``]);
    }
    else if (this.type && !this.typesArray.includes(this.type)) {
      this.router.navigate([``]);
    }
    else if (this.type && !this.secondaryType) {
      this.router.navigate([`types`], {queryParams: {type1: this.type, limit: this.limit}});
      this.type = this.type;
      this.secondaryType = null;
      this.getPokemons();
    }
    else if (this.type && this.secondaryType && !this.typesArray.includes(this.secondaryType)) {
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

  filterChange(event: {type1: string, type2: string, limit: number}) {
    console.log("event: ", event);
    this.type = event.type1;
    this.secondaryType = event.type2;
    this.limit = event.limit;
    this.router.navigate([`types`], {queryParams: { type1: this.type, type2: this.secondaryType, limit: this.limit }})
    this.getPokemons();
    // this.pokemonToShow = this.pokemonService.filterPokemonArrayByTypes(this.pokemon, this.type, this.secondaryType);
  }

  limitChange(event: any) {
    // this.limit = event;
    // this.pokemonToShow = this.pokemonService.limitPokemonArray(this.pokemon, this.offset, this.limit);
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
