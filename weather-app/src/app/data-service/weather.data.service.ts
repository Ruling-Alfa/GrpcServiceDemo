import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { WeatherRequest, WeatherResponse } from '../proto/weather_pb';
import { Status, WeatherClient } from '../proto/weather_pb_service';

@Injectable({
    providedIn: 'root'
})
export class WeatherDataService {
    weatherClient: WeatherClient;
    constructor() {
        this.weatherClient = new WeatherClient("https://localhost:5003");
    }

    getData(): Observable<WeatherResponse> {
        return new Observable(obs => {
            const req = new WeatherRequest();
            let stream = this.weatherClient.getWeather(req);
            stream.on('status', (status: Status) => {
                console.log('ApiService.getStream.status', status);
            });
            stream.on('data', msg => {

            });
            stream.on('data', (message: WeatherResponse) => {
                console.log('ApiService.getStream.data', message.toObject());
                obs.next(message);
            });
            stream.on('end', () => {
                console.log('ApiService.getStream.end');
                obs.complete();
                // obs.error();
            });
        });
    }
}