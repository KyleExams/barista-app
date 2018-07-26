import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AppComponent } from './app.component';
//import { CitiesComponent } from './cities/cities.component';

@NgModule({
  declarations: [
    AppComponent,
    //CitiesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSmartModalModule.forRoot(),
    //RouterModule.forRoot([
    //  { path: '', redirectTo: 'cities', pathMatch: 'full' },
    //  { path: 'cities', component: CitiesComponent }
    //])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
