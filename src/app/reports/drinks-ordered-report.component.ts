import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

import { ReportItem } from '../models';

@Component({
	selector: 'drinks-ordered-report',
	templateUrl: './drinks-ordered-report.component.html',
	styleUrls: ['./drinks-ordered-report.component.css']
})
export class DrinksOrderedReportComponent implements OnInit {
	//chart styles
	animations: boolean = true;
	colorScheme = 'natural';
	legendTitle = '';
	gradient: boolean = false;
	roundDomains: boolean = true;
	roundEdges: boolean = true;
	schemeType = 'ordinal';
	showXAxis: boolean = true;
	showYAxis: boolean = true;
	showXAxisLabel: boolean = false;
	showYAxisLabel: boolean = true;
	showGridLines: boolean  = true;
	showLegend: boolean = false;
	tooltipDisabled: boolean = false;
	xAxisLabel = '';
	yAxisLabel = 'Drinks';

	data: ReportItem[] = [];

	id: any;
	dataHasLoaded: boolean = false;
	displayReport: boolean = false;

	constructor(private route: ActivatedRoute,
		private http: HttpClient,
		private ngxSmartModalService: NgxSmartModalService,
		private toastr: ToastrService) { }

	ngOnInit() {
		this.route.params.subscribe(params => { this.id = params['id']; });
	}

	public ShowDrinksOrderedModal() {
		this.data = [];
		this.dataHasLoaded = false;
		this.http.get<ReportItem[]>("api/barista/getdrinksordered/" + this.id)
			.subscribe(
			res => {
				this.ngxSmartModalService.getModal('drinksOrderedModal').open();
				setTimeout(() => {
					this.data = res;
					this.dataHasLoaded = true;
					this.ToggleDisplayReportLink();
				}, 1000);
			},
			err => {
				this.toastr.error('Error', err.error);
			});
	}

	public axisFormat = (val) => {
		if (val % 1 === 0) {
			return val.toLocaleString();
		} else {
			return '';
		}
	}

	private ToggleDisplayReportLink(): void {
		if (this.dataHasLoaded) {
			this.data.forEach((reportItem: ReportItem) => {
				if (reportItem.value > 0) {
					this.displayReport = true;
					return;
				}
			});
		} else {
			this.displayReport = false;
		}
	}
}