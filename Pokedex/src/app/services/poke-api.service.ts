import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Limit, Pokemon, PokemonList } from '../models/pokemon-models';
import { Observable, combineLatest, forkJoin, from, of, switchMap, take, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {

  constructor(
    private httpClient: HttpClient
  ) {}
//Observable<Pokemon[]>
  getPokemons(offset: number, limit: number)  {
    let queryParams = {
      "offset": offset,
      "limit": limit
    }
    //return this.httpClient.get<Pokemon[]>("https://pokeapi.co/api/v2/pokemon", {params: queryParams});

    let requestArray: Observable<Pokemon>[] = new Array();
    return this.httpClient.get<Limit>("https://pokeapi.co/api/v2/pokemon", {params: queryParams}).pipe(
      switchMap((pokemonList: Limit) => {
        console.log("lista: ", pokemonList);
        pokemonList.results.forEach((pokemon: PokemonList) => {
          requestArray.push(this.httpClient.get<Pokemon>(pokemon.url));
        })
        console.log("requestArray: ", requestArray);
        return forkJoin(requestArray)
      })
    )

  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

}
