import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientBaseService } from './httpclient.base.service';

@Injectable()
export class HeroTestService {

  private serviceUrl = 'http://localhost:3000/heroes';

  constructor(
    private httpService: HttpClientBaseService,
  ) { }

  getAllHero(): Observable<any[]> {
    return this.httpService.get<any[]>(this.serviceUrl);
  }
}
