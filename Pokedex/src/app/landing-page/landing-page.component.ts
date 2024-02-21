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
  typeLimit: number = 10;
  searchFor: "regular" | "type" = "regular";
  pokemonsToShow: Pokemon[] = [];

  constructor(
    private pokemonService: PokeAPIService
  ) {}

  ngOnInit(): void {
    
  }

  getPokemons() {

  }

  onScroll(): void {
    this.offset += 10;
    this.getPokemons();
  }
}
