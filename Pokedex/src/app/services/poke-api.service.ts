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

  getPokemonByType(type: string, offset: number, limit: number) {
    let requestArray: Observable<Pokemon>[] = new Array();
    return this.httpClient
      .get<Pokemon[]>(`https://pokeapi.co/api/v2/type/${type}`)
      .pipe(
        switchMap((requestedPokemons: any) => {
          // caso ultrapasse o tamanho do array
          if (offset + limit > requestedPokemons.pokemon.length) {
            limit = requestedPokemons.pokemon.length;
          }
          requestedPokemons.pokemon
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

  pokemonObjectParser(pokemon: any): Pokemon {
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.other['official-artwork'].front_default
        ? pokemon.sprites.other['official-artwork'].front_default
        : pokemon.sprites.front_default,
      types: {
        type_1: {
          name: pokemon.types[0].type.name,
        },
        type_2: pokemon.types[1] ? { name: pokemon.types[1].type.name } : null,
      },
    };
  }
}
