import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherDataService } from '../data-service/weather.data.service';
import { WeatherResponse } from '../proto/weather_pb';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherResponse: Array<WeatherResponse> = [];
  constructor(private weatherDataService: WeatherDataService) { }

  async ngOnInit(): Promise<void> {
    this.weatherDataService.getData().subscribe(data => {
      this.weatherResponse.push(data);
    });
  }

}
