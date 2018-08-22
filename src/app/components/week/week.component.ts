import { Component, OnInit } from '@angular/core';
import { Foodtruck } from '../../model/foodtruck';
import { ActivatedRoute } from '@angular/router';
import { FoodtruckService } from '../../services/foodtruck.service';

@Component({
  selector: 'app-week',
  templateUrl: 'week.component.html',
  styleUrls: ['week.component.scss']
})

export class WeekComponent implements OnInit {

  foodtrucks: Foodtruck[];
  day: number;

  constructor(
    private route: ActivatedRoute,
    private foodtruckService: FoodtruckService) { }

  ngOnInit() {
    this.day = +this.route.snapshot.paramMap.get('id');
    this.getFoodtrucksByDay();
  }

  getFoodtrucksByDay() : void {
    this.foodtruckService.getFoodtrucksByDay(this.day.toString()).then((fs: Foodtruck[]) => {
      this.foodtrucks = fs;
    });
  }
}
