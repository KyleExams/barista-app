import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { PantryOrdersComponent } from './pantry-orders.component';
import { Pantry, CoffeeType } from '../models';
import { UtilityService } from '../utility-service';

@Component({
	selector: 'app-pantry',
	templateUrl: './pantry.component.html',
	styleUrls: ['./pantry.component.css']
})
export class PantryComponent implements OnInit {
	@ViewChild(PantryOrdersComponent) pantryOrders: PantryOrdersComponent;

	pantry: Pantry;
	coffeeName: string;
	errorMessage: string;
	isBusy: boolean = false;
	isError: boolean = false;

	constructor(private route: ActivatedRoute,
		private http: HttpClient,
		private ngxSmartModalService: NgxSmartModalService,
		private utils: UtilityService) { }

	ngOnInit() {
		console.log("Pantry Component Init");
		this.route.params.subscribe(params => { this.GetPantry(params['id']); });
	}

	public OrderDoubleAmericano(): void {
		this.coffeeName = this.utils.GetCoffeeName(CoffeeType.DoubleAmericano);
		this.isBusy = true;
		this.ngxSmartModalService.getModal('orderProgressModal').open();
		this.OrderCoffee(CoffeeType.DoubleAmericano);
	}

	public OrderSweetLatte(): void {
		this.coffeeName = this.utils.GetCoffeeName(CoffeeType.SweetLatte);
		this.isBusy = true;
		this.ngxSmartModalService.getModal('orderProgressModal').open();
		this.OrderCoffee(CoffeeType.SweetLatte);
	}

	public OrderFlatWhite(): void {
		this.coffeeName = this.utils.GetCoffeeName(CoffeeType.FlatWhite);
		this.isBusy = true;
		this.ngxSmartModalService.getModal('orderProgressModal').open();
		this.OrderCoffee(CoffeeType.FlatWhite);
	}

	private GetPantry(id: number): void {
		this.http.get<Pantry>("api/barista/getpantry/" + id)
			.subscribe(
			res => {
				this.pantry = res;
				console.log(this.pantry);
			},
			err => {
				console.log("Error occured");
			});
	}

	private OrderCoffee(coffeeType: CoffeeType): void {
		this.http.post("api/barista/addorder", { coffeeType: coffeeType, pantryId: this.pantry.id }, httpOptions)
			.subscribe(
			res => {
				setTimeout(() => {
					this.isBusy = false;
					setTimeout(() => {
						this.CloseProgressModal();
						this.pantryOrders.GetOrderHistory(this.pantry.id);
					}, 2000)
				}, 5000);
			},
			err => {
				this.isError = true;
				this.errorMessage = err.error;
				setTimeout(() => {
					this.CloseProgressModal();
					this.isError = false;
				}, 3000);
			});
	}

	private CloseProgressModal(): void {
		this.ngxSmartModalService.getModal('orderProgressModal').close();
	}
}

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};