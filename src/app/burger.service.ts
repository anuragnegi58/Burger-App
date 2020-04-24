import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BurgerService {

  constructor(private http: HttpClient) { }
  public getBurgers() {
    return this.http.get('http://demo5782500.mockable.io/burgers');
  }
}
