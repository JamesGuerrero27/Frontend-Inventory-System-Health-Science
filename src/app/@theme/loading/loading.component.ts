import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})

export class LoadingComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  constructor() { }

  ngOnInit() {
  }

}
