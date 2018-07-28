import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { map, tap } from 'rxjs/operators';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import * as _ from "lodash";

import { Pantry } from '../models';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	pantries: Pantry[];

	public constructor(private http: HttpClient,
		private router: Router,
		private ngxSmartModalService: NgxSmartModalService,
		private toastr: ToastrService) { }

	public ngOnInit(): void {
		this.LoadPantries();
	}

	public InitializeModal(newPantryForm: NgForm): void {
		newPantryForm.reset();
	}

	public AddPantry(newPantryForm: NgForm): void {
		this.http.post("api/barista/addpantry", newPantryForm.value, httpOptions)
			.subscribe(
			res => {
				this.LoadPantries();
				this.ngxSmartModalService.getModal('newPantryModal').close();
			},
			err => {
				this.toastr.error('Error', err.error);
				this.ngxSmartModalService.getModal('newPantryModal').close();
			});
	}

	public SelectPantry(id: number): void {
		this.router.navigateByUrl('/pantry/' + id);
	}

	private LoadPantries(): void {
		this.http.get<Pantry[]>("api/barista/getpantries")
			.subscribe(
			res => {
				this.pantries = res;
			},
			err => {
				this.toastr.error('Error', err.error);
			});
	}

}

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};
