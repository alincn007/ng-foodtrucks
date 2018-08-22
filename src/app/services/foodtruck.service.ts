import { Injectable, OnInit } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import { Foodtruck } from '../model/foodtruck';
import { FOODTRUCKS } from './mock-foodtrucks';

/* const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; */

@Injectable()
export class FoodtruckService {
  private foodtrucksUrl = 'http://localhost:5000/api/foodtrucks';

  constructor (private http: Http) {
    this.init();
  }

  private init(): void {
    console.log('Init FoodtruckService...');
    this.getFoodtrucks().then((foodtrucks: Foodtruck[]) => {
      if (foodtrucks.length === 0) {
        for (let index = 0; index < FOODTRUCKS.length; index++) {
          const foodtruck = FOODTRUCKS[index];
          this.createFoodtruck(foodtruck).then((f: Foodtruck) => {
            console.log('Foodtruck ' + foodtruck._id + ' created !');
          });
        }
      }
    });
  }

  // get("/api/foodtrucks")
  getFoodtrucks(): Promise<void | Foodtruck[]> {
    return this.http.get(this.foodtrucksUrl)
      .toPromise()
      .then(response => response.json() as Foodtruck[])
      .catch(this.handleError);
  }

  // post("/api/foodtrucks")
  createFoodtruck(newFoodtruck: Foodtruck): Promise<void | Foodtruck> {
    return this.http.post(this.foodtrucksUrl, newFoodtruck)
      .toPromise()
      .then(response => response.json() as Foodtruck)
      .catch(this.handleError);
  }

  // get("/api/foodtrucks/:id")
  getFoodtruck(getFoodtruckId: String): Promise<void | Foodtruck> {
    return this.http.get(this.foodtrucksUrl + '/' + getFoodtruckId)
      .toPromise()
      .then(response => response.json() as Foodtruck)
      .catch(this.handleError);
  }

  // delete("/api/foodtrucks/:id")
  deleteFoodtruck(delFoodtruckId: String): Promise<void | String> {
    return this.http.delete(this.foodtrucksUrl + '/' + delFoodtruckId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/foodtrucks/:id")
  updateFoodtruck(putFoodtruck: Foodtruck): Promise<void | Foodtruck> {
    var putUrl = this.foodtrucksUrl + '/' + putFoodtruck._id;
    return this.http.put(putUrl, putFoodtruck)
      .toPromise()
      .then(response => response.json() as Foodtruck)
      .catch(this.handleError);
  }

  // get("/api/foodtrucks")
  getFoodtrucksByDay(day: String): Promise<void | Foodtruck[]> {
    return this.http.get(this.foodtrucksUrl + '/day/' + day)
      .toPromise()
      .then(response => response.json() as Foodtruck[])
      .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
