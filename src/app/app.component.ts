import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as _ from "lodash";

@Component({
  selector: 'barista-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  pantries: Pantry[];

  public constructor(private http: HttpClient,
    private ngxSmartModalService: NgxSmartModalService) { }

  public ngOnInit(): void {
    this.LoadPantries();
  }

  public AddPantry(newPantryForm: NgForm): void {
    console.log(newPantryForm.value);
    this.http.post("api/barista/addpantry", newPantryForm.value, httpOptions)
      .subscribe(
      res => {
        console.log(res);
        this.LoadPantries();
        this.ngxSmartModalService.getModal('newPantryModal').close();
      },
      err => {
        console.log("Error occured");
        this.ngxSmartModalService.getModal('newPantryModal').close();
      });
  }

  public InitializeModal(newPantryForm: NgForm): void {
    newPantryForm.reset();
    console.log('open modal');
  }

  private LoadPantries(): void {
    this.http.get<Pantry[]>("api/barista/getpantries")
      .subscribe(
      res => {
        this.pantries = res;
        console.log(this.pantries);
      },
      err => {
        console.log("Error occured");
      });
  }

}
interface Pantry {
  Id: number;
  Name: string;
  Inventory: Inventory;
}

interface Inventory {
  CoffeeBeansUnits: number;
  SugarUnits: number;
  MilkUnits: number;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
