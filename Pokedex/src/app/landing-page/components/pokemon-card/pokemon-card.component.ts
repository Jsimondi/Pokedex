import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon-models';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input() card: Pokemon = new Pokemon()
  @Output() typeEmitter = new EventEmitter()

  constructor() {}

  ngOnInit() {

  }

  searchType(typeName: string) {
    console.log("search type: ", typeName);
    this.typeEmitter.emit(typeName);
  }
}
