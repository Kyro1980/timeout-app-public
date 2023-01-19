import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EarlyBirdService {

  constructor() { }

  get_earlyBird(){
    let current_date = new Date();
    let end_of_early_bird = new Date(2023, 1, 17);
    // let end_of_early_bird = new Date(2023, 0, 1);
    let current_date1 = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate());
    let end_of_early_bird1 = new Date(end_of_early_bird.getFullYear(), end_of_early_bird.getMonth(), end_of_early_bird.getDate());

    if (current_date1.getTime() < end_of_early_bird1.getTime()){
      return {
        early_bird:  true,
        price: 75,
        totalPrice: 75
      };
    }else if (current_date1.getTime() > end_of_early_bird1.getTime()){
      return {
        early_bird:  false,
        price: 100,
        totalPrice: 100
      };
    }else{
      return {
        early_bird:  true,
        price: 75,
        totalPrice: 75
      };
    }
  }
}
