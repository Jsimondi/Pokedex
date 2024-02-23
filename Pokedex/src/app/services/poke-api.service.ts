import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Limit,
  Pokemon,
  PokemonList,
  PokemonTypeList,
} from '../models/pokemon-models';
import {
  Observable,
  combineLatest,
  forkJoin,
  from,
  map,
  of,
  switchMap,
  take,
  tap,
  toArray,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeAPIService {
  constructor(private httpClient: HttpClient) {}

  getPokemons(offset: number, limit: number): Observable<Pokemon[]> {
    let queryParams = {
      offset: offset,
      limit: limit,
    };

    let requestArray: Observable<Pokemon>[] = new Array();
    return this.httpClient
      .get<Limit>('https://pokeapi.co/api/v2/pokemon', { params: queryParams })
      .pipe(
        switchMap((pokemonList: Limit) => {
          pokemonList.results.forEach((pokemon: PokemonList) => {
            requestArray.push(this.httpClient.get<Pokemon>(pokemon.url));
          });
          return forkJoin(requestArray);
        }),
        map((requestedPokemons: any) =>
          requestedPokemons.map(this.pokemonObjectParser)
        )
      );
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
  }

  getPokemonByUrl(url: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(url);
  }

  getAllTypes(): Observable<any> {
    return this.httpClient.get<any>(`https://pokeapi.co/api/v2/type/`);
  }

  getPokemonByType(type: string | null) {
    let requestArray: Observable<Pokemon>[] = new Array();
    return this.httpClient.get(`https://pokeapi.co/api/v2/type/${type}`).pipe(
      switchMap((typeResponse: any) => {
        typeResponse.pokemon.forEach((element: any) => {
          requestArray.push(this.httpClient.get<Pokemon>(element.pokemon.url))
        })
        return forkJoin(requestArray)
      }),
      map((requestedPokemons: any) =>
        requestedPokemons.map(this.pokemonObjectParser)
      )
    )
  }

  getPokemonByTypePaginated(type: string, offset: number, limit: number) {
    let requestArray: Observable<Pokemon>[] = new Array();
    return this.httpClient
      .get<Pokemon[]>(`https://pokeapi.co/api/v2/type/${type}`)
      .pipe(
        switchMap((typeResponse: any) => {
          // caso ultrapasse o tamanho do array
          if (offset + limit > typeResponse.pokemon.length) {
            limit = typeResponse.pokemon.length;
          }
          typeResponse.pokemon
            .slice(offset, limit)
            .forEach((pokemonList: PokemonTypeList) => {
              requestArray.push(this.httpClient.get<Pokemon>(pokemonList.pokemon.url));
            })
          return forkJoin(requestArray)
        }),
        map((requestedPokemons: any) =>
          requestedPokemons.map(this.pokemonObjectParser)
        )
      );
  }

  limitPokemonArray(arr: Pokemon[], start: number, finish: number): Pokemon[] {
    return arr.slice(start, finish);
  }

  filterPokemonArrayByTypes(arr: Pokemon[], type1: string, type2: string): (Pokemon | null)[] {
    let filteredArray: Pokemon[] = [];
    arr.forEach((pokemon: Pokemon) => {
      const objValues = Object.values(pokemon.types);
      if (objValues.includes(type1) && objValues.includes(type2)) {
        filteredArray.push(pokemon);
      }
    })
    console.log("filtered Array: ", filteredArray)
    return filteredArray;
  }

  pokemonObjectParser(pokemon: any): Pokemon {
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.other['official-artwork'].front_default
        ? pokemon.sprites.other['official-artwork'].front_default
        : pokemon.sprites.front_default,
      types: {
        type_1: pokemon.types[0].type.name,
        type_2: pokemon.types[1] ? pokemon.types[1].type.name : null,
      },
    };
  }
}
