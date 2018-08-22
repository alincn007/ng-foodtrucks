import { Component } from '@angular/core';
import { Foodtruck } from './model/foodtruck';
import { FoodtruckService } from './services/foodtruck.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Foodtrucks';
  week = [1, 2, 3, 4, 5];
  foodtrucks: Foodtruck[];
  
  constructor(private foodtruckService:FoodtruckService) {}

  ngOnInit() {
    this.getFoodtrucks();
  }

  getFoodtrucks() : void {
    this.foodtruckService.getFoodtrucks().then((fs: Foodtruck[]) => {
      this.foodtrucks = fs;
    });
  }
}
