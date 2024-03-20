import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon-models';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() card: Pokemon | null = new Pokemon()
  @Output() typeEmitter = new EventEmitter()

  constructor() {}

  ngOnInit() {}

  searchType(typeName: string | undefined | null) {
    typeName ? this.typeEmitter.emit(typeName) : null;
  }
}
