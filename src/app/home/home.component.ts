import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { BurgerService } from "./../burger.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  @ViewChild("confirmation") confirmation: ElementRef;
  public burgerList;
  public burgers;
  public selectedValue;
  public orderCart = [];
  public totalCartValue: number = 0;
  public criteria = [
    "Select the filter criteria",
    "Veg",
    "Non Veg",
    "5 Star Rating",
    "Price less than 100",
  ];
  constructor(private burgerService: BurgerService) {}

  ngOnInit(): void {
    this.burgerService.getBurgers().subscribe((data) => {
      this.burgerList = data;
      if (this.burgerList.burgers.length > 0) {
        this.burgers = this.burgerList.burgers;
      }
    });
  }
  public searchBurger($event) {
    if (!$event.data) {
      this.burgers = this.burgerList.burgers;
    } else {
      this.burgers = this.burgerList.burgers.filter((item) =>
        item.name.toLowerCase().includes($event.data.toLowerCase())
      );
    }
  }

  public valueSelected($event) {
    if ($event.target.value === "Veg") {
      this.burgers = this.burgerList.burgers.filter(
        (item) => item.isVeg === true
      );
    }
    if ($event.target.value === "Non Veg") {
      this.burgers = this.burgerList.burgers.filter(
        (item) => item.isVeg === false
      );
    }
    if ($event.target.value === "Price less than 100") {
      this.burgers = this.burgerList.burgers.filter((item) => item.price < 100);
    }
    if ($event.target.value === "5 Star Rating") {
      this.burgers = this.burgerList.burgers.filter(
        (item) => item.ratings === 5
      );
    }
  }
  public addToCart(burger) {
    this.orderCart.push(burger);
    this.totalCartValue = this.orderCart.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
  }
  public confirmOrder() {
    this.confirmation.nativeElement.style.display = "block";
  }
  public close() {
    this.confirmation.nativeElement.style.display = "none";
    this.orderCart.length =0;
  }
}
