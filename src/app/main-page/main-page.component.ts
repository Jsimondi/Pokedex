import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { Pokemon } from '../models/pokemon-models';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { of, switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPage implements OnInit {
  offset: number = 0;
  limit: number = 10;

  loading: boolean = true;

  pokemon: Pokemon[] = [];
  pokemonToShow: Pokemon[] = [];
  typesArray: string[] = [];
  type: string = '';
  secondaryType: string | null = null;

  searchingPokemon: boolean = false;
  searchedPokemonArray: Pokemon[] = [];
  filteredPokemonArray: Pokemon[] = [];

  constructor(
    private pokemonService: PokeAPIService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pokemonService.getAllTypes().subscribe(types => {
      types.results.forEach((type: any) => {
        this.typesArray.push(type.name);
      });
      this.setTypes(this.activatedRoute.snapshot.queryParams);
      this.checkIfTypesExist();
    });
  }

  getPokemons() {
    this.loading = true;
    this.offset = 0;
    this.searchingPokemon = false;
    this.searchedPokemonArray = [];
    this.pokemonService
      .getPokemonByType(this.type)
      .subscribe((res: Pokemon[]) => {
        this.pokemon = res;
        this.filteredPokemonArray =
          this.pokemonService.filterPokemonArrayByTypes(
            this.pokemon,
            this.type,
            this.secondaryType ? this.secondaryType : ''
          );
        if (this.secondaryType) {
          this.searchingPokemon = true;
          this.searchedPokemonArray = this.pokemonToShow;
        } else {
          this.searchedPokemonArray = [];
        }
        this.pokemonToShow = this.pokemonService.limitPokemonArray(
          this.filteredPokemonArray,
          this.offset,
          this.limit
        );
        this.loading = false;
      });
  }

  checkIfTypesExist() {
    if (!this.type) {
      this.router.navigate([``]);
    } else if (this.type && !this.typesArray.includes(this.type)) {
      this.router.navigate([``]);
    } else if (this.type && !this.secondaryType) {
      this.router.navigate([`types`], {
        queryParams: { type1: this.type, limit: this.limit },
      });
      this.type = this.type;
      this.secondaryType = null;
      this.getPokemons();
    } else if (
      this.type &&
      this.secondaryType &&
      !this.typesArray.includes(this.secondaryType)
    ) {
      this.router.navigate([`/types`], {
        queryParams: { type1: this.type, limit: this.limit },
      });
      this.secondaryType = null;
      this.getPokemons();
    }
  }

  setTypes(params: Params) {
    this.type = params['type1'];
    params['type2']
      ? (this.secondaryType = params['type2'])
      : (this.secondaryType = null);
    params['limit'] ? (this.limit = params['limit']) : (this.limit = 10);
    this.getPokemons();
    if (this.secondaryType) {
      this.searchedPokemonArray = this.pokemon;
    }
  }

  clickedNewType(event: string) {
    if (event != this.type) {
      this.type = event;
    }
    this.router.navigate([`types`], {
      queryParams: { type1: this.type, limit: this.limit },
    });
    this.getPokemons();
  }

  filterChange(event: { type1: string; type2: string; limit: number }) {
    this.type = event.type1;
    this.secondaryType = event.type2;
    this.limit = event.limit;
    this.router.navigate([`types`], {
      queryParams: {
        type1: this.type,
        type2: this.secondaryType,
        limit: this.limit,
      },
    });
    this.getPokemons();
  }

  searchPokemon(searchTerm: { search: string }) {
    this.offset = 0;
    this.searchedPokemonArray = [];
    if (searchTerm.search == '') {
      this.searchingPokemon = false;
      this.pokemonToShow = this.filteredPokemonArray;
      if (this.secondaryType) {
        this.pokemonToShow = this.filteredPokemonArray;
        this.searchedPokemonArray = this.pokemonToShow;
      } else {
        this.pokemonToShow = this.pokemonService.limitPokemonArray(
          this.pokemon,
          0,
          this.limit
        );
        this.searchedPokemonArray = [];
      }
    } else {
      this.searchingPokemon = true;
      let searchArray: Pokemon[] = [];
      this.pokemon.forEach((pokemon: Pokemon) => {
        if (
          pokemon.name.toLowerCase().includes(searchTerm.search.toLowerCase())
        ) {
          searchArray.push(pokemon);
        }
      });
      this.searchedPokemonArray = searchArray;
      this.pokemonToShow = this.pokemonService.limitPokemonArray(
        this.searchedPokemonArray,
        0,
        this.limit
      );
    }
  }

  next() {
    if (this.searchingPokemon) {
      if (
        Number(this.offset) + Number(this.limit) >
        this.searchedPokemonArray.length
      ) {
        this.pokemonToShow = this.pokemonService.limitPokemonArray(
          this.searchedPokemonArray,
          this.offset,
          this.limit
        );
      } else {
        this.offset += Number(this.limit);
        this.pokemonToShow = this.pokemonService.limitPokemonArray(
          this.searchedPokemonArray,
          this.offset,
          this.limit
        );
      }
    } else {
      if (Number(this.offset) + Number(this.limit) > this.pokemon.length) {
        this.pokemonToShow = this.pokemonService.limitPokemonArray(
          this.pokemon,
          this.offset,
          this.limit
        );
      } else {
        this.offset += Number(this.limit);
        this.pokemonToShow = this.pokemonService.limitPokemonArray(
          this.pokemon,
          this.offset,
          this.limit
        );
      }
    }
  }

  back() {
    if (this.searchingPokemon) {
      if (Number(this.offset) - Number(this.limit) < 0) {
        this.pokemonToShow = this.pokemonService.limitPokemonArray(
          this.searchedPokemonArray,
          0,
          this.limit
        );
      } else {
        this.offset -= Number(this.limit);
        this.pokemonToShow = this.pokemonService.limitPokemonArray(
          this.searchedPokemonArray,
          this.offset,
          this.limit
        );
      }
    } else {
      if (Number(this.offset) - Number(this.limit) < 0) {
        this.pokemonToShow = this.pokemonService.limitPokemonArray(
          this.pokemon,
          0,
          this.limit
        );
      } else {
        this.offset -= Number(this.limit);
        this.pokemonToShow = this.pokemonService.limitPokemonArray(
          this.pokemon,
          this.offset,
          this.limit
        );
      }
    }
  }

  nextOrBackEvent(event: string) {
    switch (event) {
      case 'next':
        this.next();
        break;
      case 'back':
        this.back();
        break;
    }
  }

  goToPage(page: number) {
    this.offset = page * this.limit;
    if (this.searchingPokemon) {
      this.pokemonToShow = this.pokemonService.limitPokemonArray(
        this.searchedPokemonArray,
        this.offset,
        this.limit
      );
    } else {
      this.pokemonToShow = this.pokemonService.limitPokemonArray(
        this.pokemon,
        this.offset,
        this.limit
      );
    }
  }

  // onScroll(): void {
  //   console.log("scrolled");
  //   this.offset += 10;
  // }
}
