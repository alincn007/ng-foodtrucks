import { Component, OnInit } from '@angular/core';
import { Foodtruck } from '../../model/foodtruck';
import { FoodtruckService } from '../../services/foodtruck.service';

@Component({
  selector: 'app-foodtrucks',
  templateUrl: 'foodtrucks.component.html',
  styleUrls: [ 'foodtrucks.component.scss' ]
})
export class FoodtrucksComponent implements OnInit {

  foodtrucks : Foodtruck[];

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
