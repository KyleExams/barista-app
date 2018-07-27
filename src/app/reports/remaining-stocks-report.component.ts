import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { ReportGroup } from '../models';

@Component({
	selector: 'remaining-stocks-report',
	templateUrl: './remaining-stocks-report.component.html',
	styleUrls: ['./remaining-stocks-report.component.css']
})
export class RemainingStocksReportComponent implements OnInit {
	//chart styles
	animations: boolean = true;
	colorScheme = 'natural';
	legendTitle = '';
	gradient: boolean = false;
	roundDomains: boolean = false;
	roundEdges: boolean = true;
	schemeType = 'ordinal';
	showXAxis: boolean = true;
	showYAxis: boolean = true;
	showXAxisLabel: boolean = false;
	showYAxisLabel: boolean = true;
	showGridLines: boolean  = true;
	showLegend: boolean = true;
	tooltipDisabled: boolean = false;
	xAxisLabel = '';
	yAxisLabel = 'Stocks';

	data: ReportGroup[] = [];

	id: any;
	dataHasLoaded: boolean = false;

	constructor(private route: ActivatedRoute,
		private http: HttpClient,
		private ngxSmartModalService: NgxSmartModalService) { }

	ngOnInit() {
		console.log("Remaining Stocks Report Component Init");
		this.route.params.subscribe(params => { this.id = params['id']; });
	}

	public ShowRemainingStocksModal() {
		this.data = [];
		this.dataHasLoaded = false;
		this.http.get<ReportGroup[]>("api/barista/getremainingstocks/" + this.id)
			.subscribe(
			res => {
				this.ngxSmartModalService.getModal('remainingStocksModal').open();
				setTimeout(() => {
					this.data = res;
					this.dataHasLoaded = true;
					console.log(this.data);
				}, 1000);
			},
			err => {
				console.log("Error occured");
			});
	}
}