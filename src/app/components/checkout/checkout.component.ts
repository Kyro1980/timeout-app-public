import { CheckoutService } from './../../services/checkout.service';
import { PaymentInfo } from './../../common/payment-info';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EarlyBirdService } from './../../services/early-bird.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  early_birds = true;
  price: number;
  totalPrice:number;
  totalQuantity: number = 1;
  checkoutFormGroup: FormGroup;

  stripe = Stripe("pk_test_something")
  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = "";

  constructor(private checkoutService: CheckoutService, private earlyBirdService: EarlyBirdService,
    private formBuilder: FormBuilder, private router: Router){}

  ngOnInit(): void {
    let earlyBird = this.earlyBirdService.get_earlyBird();
    this.early_birds = earlyBird.early_bird;
    this.price = earlyBird.price;
    this.totalPrice = earlyBird.totalPrice;
    this.setupStripePaymentForm();

    this.checkoutFormGroup = this.formBuilder.group({
      creditCard: this.formBuilder.group({
        //done by stripe
      })
    })

  }
  setupStripePaymentForm() {
    let elements = this.stripe.elements();
    this.cardElement = elements.create('card', { hidePostalCode: true});
    this.cardElement.mount('#card-element');

    this.cardElement.on('change', (event: any) => {
      this.displayError = document.getElementById('card-errors');
      if(event.complete){
        this.displayError.textContent = "";
      }else if(event.error){
        //show validation error
        this.displayError.textContent = event.error.message;

      }
    });
  }
  onSubmit() {
    // compute payment info
    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = "CAD";
    // this.paymentInfo.currency = "USD";
    if (!this.checkoutFormGroup.invalid && this.displayError.textContent === "") {

      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
            {

              payment_method: {
                card: this.cardElement
              }
            }, { handleActions: false })
          .then(function(result) {
            if (result.error) {
              // inform the customer there was an error
              alert(`There was an error: ${result.error.message}`);
            } else {
              // reset cart
              this.resetCart();
            }
          }.bind(this));
        }
      );
    } else {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
  }

  resetCart(){
    this.totalQuantity = 1;
    //reset the form
    this.checkoutFormGroup.reset();
    //navigate to the home page
    this.router.navigateByUrl("/success");
  }
  onInputQuantityChange(searchValue: number): void {

    if(searchValue){
      this.totalPrice = searchValue * this.price;
    }
  }
}

