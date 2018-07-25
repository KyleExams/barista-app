import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as _ from "lodash";

@Component({
  selector: 'barista-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  pantries$: Observable<Pantry[]>;

  public constructor(private http: HttpClient) { }

  public ngOnInit(): void {
    this.pantries$ = this.http.get<Pantry[]>("/barista/getpantries")
      .pipe(
        map(data => _.values(data)),
        tap(console.log)
      );

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
