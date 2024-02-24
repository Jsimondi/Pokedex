import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-types-page',
  templateUrl: './types-page.component.html',
  styleUrls: ['./types-page.component.css']
})
export class TypesPageComponent {
  typesToDisplay: any;

  constructor(
    private pokemonService: PokeAPIService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pokemonService.getAllTypes().subscribe(res => {
      this.typesToDisplay = res.results;
    })
  }

  selectType(type: string) {
    this.router.navigate(["types"], { queryParams: { type1: type }});
  }

}
