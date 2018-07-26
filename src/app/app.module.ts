import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PantryComponent } from './pantry/pantry.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
	{ path: 'pantry/:id', component: PantryComponent },
];

@NgModule({
	declarations: [
    AppComponent,
    HomeComponent,
	  PantryComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		HttpClientModule,
		BrowserAnimationsModule,
		NgxSmartModalModule.forRoot(),
		RouterModule.forRoot(
			appRoutes,
			//{ enableTracing: true } // <-- debugging purposes only
		)
	],
	providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
