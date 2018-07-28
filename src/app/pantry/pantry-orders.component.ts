import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { OrderHistory } from '../models';
import { UtilityService } from '../utility-service';

@Component({
	selector: 'pantry-orders',
	templateUrl: './pantry-orders.component.html',
	styleUrls: ['./pantry-orders.component.css']
})
export class PantryOrdersComponent implements OnInit {
	orderHistory: OrderHistory[];

	constructor(private route: ActivatedRoute,
		private http: HttpClient,
		private utils: UtilityService,
		private toastr: ToastrService) { }

	ngOnInit() {
		this.route.params.subscribe(params => { this.GetOrderHistory(params['id']); });
	}

	public GetOrderHistory(id: number): void {
		this.http.get<OrderHistory[]>("api/barista/getorderhistory/" + id)
			.subscribe(
			res => {
				this.orderHistory = res;
			},
			err => {
				this.toastr.error('Error', err.error);
			});
	}
}