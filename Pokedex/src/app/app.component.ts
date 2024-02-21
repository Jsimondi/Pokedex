import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from './services/poke-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Pokedex';

  constructor(
    private pokemonService: PokeAPIService
  ) {}

  ngOnInit() {
    this.pokemonService.getPokemons(0, 20).subscribe(res => {
      console.log("res:", res);
    });
  }
}
