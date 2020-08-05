import { Component, OnInit } from '@angular/core';
import { HeroTestService } from '../model/test-service/hero-test.service';
@Component({
  template: `
  <h2 highlight="skyblue">About</h2>
  <h3>Quote of the day:</h3>
  <h2>{{msg}}</h2>
  <div>
    <button (click)="clickMe()">click me</button>
  </div>
  <div>
    <div>Heroes:</div>
    <ul>
      <li *ngFor="let item of heroes">{{item.name}}</li>
    </ul>
  </div>
  <twain-quote></twain-quote>
  `
})
export class AboutComponent implements OnInit {
  constructor(private heroTestService: HeroTestService) { }
  msg: string = 'hello';
  heroes: Array<any> = [];

  ngOnInit() {
    this.heroTestService.getAllHero().subscribe(data => {
      console.log(data);
      this.heroes = data;
    })
  }

  test(a: number, b: number) {
    if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }

  clickMe() {
    this.msg = 'hi';
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/