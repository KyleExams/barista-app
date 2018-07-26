import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { Pantry, CoffeeType } from '../models';

@Component({
	selector: 'app-pantry',
	templateUrl: './pantry.component.html',
	styleUrls: ['./pantry.component.css']
})
export class PantryComponent implements OnInit {
	pantry: Pantry;
	coffeeName: string;
	errorMessage: string;
	isBusy: boolean = false;
	isError: boolean = false;

	constructor(private route: ActivatedRoute,
		private http: HttpClient,
		private ngxSmartModalService: NgxSmartModalService	) { }

	ngOnInit() {
		console.log("Pantry Component Init");
		this.route.params.subscribe(params => { this.GetPantry(params['id']); });
	}

	public OrderDoubleAmericano(): void {
		this.coffeeName = "Double Americano";
		this.isBusy = true;
		this.ngxSmartModalService.getModal('orderProgressModal').open();
		this.OrderCoffee(CoffeeType.DoubleAmericano);
	}

	public OrderSweetLatte(): void {
		this.coffeeName = "Sweet Latte";
		this.isBusy = true;
		this.ngxSmartModalService.getModal('orderProgressModal').open();
		this.OrderCoffee(CoffeeType.SweetLatte);
	}

	public OrderFlatWhite(): void {
		this.coffeeName = "Flat White";
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
						this.CloseProgressModal()
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