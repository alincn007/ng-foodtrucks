import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpClientModule }     from '@angular/common/http';
import { HttpModule }           from '@angular/http';

import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';

// Moment
import { MomentModule }         from 'angular2-moment';

// Foodtrucks
import { FoodtrucksComponent }  from './components/foodtrucks/foodtrucks.component';
import { FoodtruckService }     from './services/foodtruck.service';
import { HomeComponent }        from './components/home/home.component';
import { FoodtruckDetailComponent } from './components/foodtruck-detail/foodtruck-detail.component';
import { TodayComponent } from './components/today/today.component';
import { WeekComponent } from './components/week/week.component'; 
import { FooterComponent } from './components/footer/footer.component';

import { AdminComponent } from './components/admin/admin.component';
import { AdminFoodtrucksComponent } from './components/admin/foodtrucks/admin-foodtrucks.component';
import { AdminFoodtrucksUpdateComponent } from './components/admin/foodtrucks/update/admin-foodtrucks-update.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MomentModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    FoodtrucksComponent,
    HomeComponent,
    FoodtruckDetailComponent,
    TodayComponent,
    WeekComponent,
    FooterComponent,
    AdminComponent,
    AdminFoodtrucksComponent,
    AdminFoodtrucksUpdateComponent
  ],
  providers: [FoodtruckService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
