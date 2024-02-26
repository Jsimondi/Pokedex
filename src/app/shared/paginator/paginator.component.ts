import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() offset: number = 0;
  @Input() limit: number = 10;
  @Input() length: number = 10;
  @Output() pageChangeEmitter = new EventEmitter();
  @Output() nextOrBackEmitter = new EventEmitter();
  selectedPage: number = 0;
  pagesToShow: number[] = [];

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pagesToShow = [];
    changes['length'] ? this.length = changes['length'].currentValue : null;
    changes['offset'] ? this.offset = changes['offset'].currentValue : null;
    changes['limit'] ? this.limit = changes['limit'].currentValue : null;
    for (let i = 0; i < Math.ceil(this.length/this.limit); i++) {
      this.pagesToShow.push(i);
    }
  }

  emitPage(page: number) {
    this.selectedPage = page;
    this.pageChangeEmitter.emit(page);
  }

  emitNextOrBack(event: string) {
    if (event === "back") {
      this.selectedPage > 0 ? this.selectedPage-- : null;
    } else {
      this.selectedPage < Math.floor(this.length/this.limit) ? this.selectedPage++ : null;
    }
    this.nextOrBackEmitter.emit(event);
  }

}
