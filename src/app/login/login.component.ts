import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges {
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {}

  emitPage(page: number) {}

  emitNextOrBack(event: string) {}

}
