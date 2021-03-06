import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  aqi: any;
  constructor(public loader: LoadingController, public navCtrl: NavController, public http: Http) {
    this.http = http;
    this.loader = loader;
    this.aqi = { data: {} };
    this.reload();
  }
  reload() {
    let loading = this.loader.create({
      spinner: 'dots',
      content: 'Loading',
      duration: 60000
    });
    this.http.get(`https://api.waqi.info/feed/here/?token=1f59a579d2ed89a93909e4144cb770b50e60b85c`)
      .toPromise()
      .then(response => {
        this.aqi = response.json();
        loading.dismiss();

      })
    
  }
  aqiStatus(val) {

    if (val <= 50) {
      return { code: 'good', val: 'Good' };
    } else if (val <= 100) {
      return { code: 'mod', val: 'Moderate' };
    } else if (val <= 200) {
      return { code: 'unhealthy', val: 'Unhealthy' };
    } if (val <= 250) {
      return { code: 'vunhealthy', val: 'Very Unhealthy' };
    } else if (val > 300) {
      return { code: 'hazardous', val: 'Hazardous' };
    } else {
      return { code: '', val: '' }
    }
  }

}