import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PantryComponent } from './pantry/pantry.component';
import { PantryOrdersComponent } from './pantry/pantry-orders.component';
import { RemainingStocksReportComponent } from './reports/remaining-stocks-report.component';
import { DrinksOrderedReportComponent } from './reports/drinks-ordered-report.component';

import { UtilityService } from './utility-service';

const appRoutes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'pantry/:id', component: PantryComponent },
];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		PantryComponent,
		PantryOrdersComponent,
		RemainingStocksReportComponent,
		DrinksOrderedReportComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		HttpClientModule,
		BrowserAnimationsModule,
		NgxSmartModalModule.forRoot(),
		NgxPaginationModule,
		NgxChartsModule,
		ToastrModule.forRoot(),
		RouterModule.forRoot(
			appRoutes,
			//{ enableTracing: true } // <-- debugging purposes only
		)
	],
	providers: [UtilityService],
	bootstrap: [AppComponent]
})
export class AppModule { }
