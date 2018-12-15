import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ForecastData } from "./forecast-data";

@Injectable({
  providedIn: "root"
})
export class ForecastService {
  constructor(private http: HttpClient) {}

  appID: string = "7b656bbd2082993421b906b430ad91e6";
  url: string = "https://api.openweathermap.org/data/2.5/forecast?q=";

  getForecast(selectedUserLocation: string) {
    return this.http.get<ForecastData>(
      `${
        this.url
      }${selectedUserLocation}&type=accurate&cnt=10&units=metric&appid=${
        this.appID
      }`
    );
  }
}
