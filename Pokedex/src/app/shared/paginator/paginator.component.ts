import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input() offset: number = 0;
  @Input() limit: number = 10;
  @Input() length: number = 10;
  @Output() pageChangeEmitter = new EventEmitter();
  @Output() nextOrBackEmitter = new EventEmitter();
  page: number = 1;
  pagesToShow: number[] = [];

  ngOnInit() {
    this.pagesToShow = [];
    console.log("length: ", this.length);
    console.log("limit: ", this.limit);
    for (let i = 0; i < Math.ceil(this.length/this.limit); i++) {
      this.pagesToShow.push(i);
    }
  }

  emitPage(page: number) {
    this.pageChangeEmitter.emit(page);
  }

  emitNextOrBack(event: string) {
    this.nextOrBackEmitter.emit(event);
  }

}
