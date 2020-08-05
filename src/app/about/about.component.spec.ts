import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { addMatchers, asyncData, click } from '../../testing';
import { AboutComponent } from './about.component';
import { HighlightDirective } from '../shared/highlight.directive';
import { HeroTestService } from '../model/test-service/hero-test.service';
import { getTestHeroes } from '../model/testing/test-heroes';
import { TestHeroService } from '../model/testing';

let fixture: ComponentFixture<AboutComponent>;
let comp: AboutComponent;

function compileAndCreate() {
  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const heroTestServiceSpy = jasmine.createSpyObj('TestHeroService', ['getAllHero']);

    TestBed.configureTestingModule({
      providers: [
        { provide: HeroTestService, useValue: heroTestServiceSpy }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AboutComponent);
        comp = fixture.componentInstance;

        // getHeroes spy returns observable of test heroes
        heroTestServiceSpy.getAllHero.and.returnValue(asyncData(getTestHeroes()));
      });
  }));
}

describe('AboutComponent (highlightDirective)', () => {
  // let comp: AboutComponent;
  beforeEach(() => {
    // fixture = TestBed.configureTestingModule({
    //   declarations: [AboutComponent, HighlightDirective],
    //   providers: [
    //     AboutComponent,
    //     TestHeroService
    //   ],
    //   schemas: [NO_ERRORS_SCHEMA]
    // })
    //   .createComponent(AboutComponent);
    // fixture.detectChanges(); // initial binding
    // comp = TestBed.inject(AboutComponent);

    TestBed.configureTestingModule({
      declarations: [AboutComponent, HighlightDirective],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  compileAndCreate();

  // it('should have skyblue <h2>', () => {
  //   const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
  //   const bgColor = h2.style.backgroundColor;
  //   expect(bgColor).toBe('skyblue');
  // });

  it('should have text content "Quote of the day:" <h3>', () => {
    const h3: HTMLElement = fixture.nativeElement.querySelector('h3');
    const textContent = h3.textContent;
    expect(textContent).toBe('Quote of the day:');
  });

  it('should test function return 0 when a <= b', () => {
    let val = comp.test(1, 2);
    expect(val).toEqual(0);
  });

  it('should test function return 1 when a > b', () => {
    let val = comp.test(2, 1);
    expect(val).toEqual(1);
  });

  it('should change msg "hello" to "hi" after clickMe', () => {
    expect(comp.msg).toBe('hello');
    comp.clickMe();
    // fixture.nativeElement.querySelector('button').click();
    expect(comp.msg).toBe('hi');
  });

  describe('after get dashboard heroes', () => {

    beforeEach(async(() => {
      fixture.detectChanges(); // runs ngOnInit -> getHeroes
      fixture.whenStable() // No need for the `lastPromise` hack!
        .then(() => fixture.detectChanges()); // bind to heroes
    }));

    it('should HAVE heroes', () => {
      expect(comp.heroes.length).toBeGreaterThan(0,
        'should have heroes after service promise resolves');
    });

    it('should DISPLAY heroes', () => {
      // Find and examine the displayed heroes
      // Look for them in the DOM by css class
      const heroes = fixture.nativeElement.querySelectorAll('li');
      debugger
      expect(heroes.length).toBe(10, 'should display 4 heroes');
    });
  });

});


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/