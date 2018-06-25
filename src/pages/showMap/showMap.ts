import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

  declare var google : any;

@Component({
    selector: 'page-showMap',
    templateUrl: 'showMap.html'
  })
  export class ShowMap {
    @ViewChild('map') mapRef: ElementRef;
 
    longituda : number;
    latituda : number;
    naziv: string;
  
    constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
      this.longituda = +navParams.get('longituda'); //51.51279;//
      this.latituda = +navParams.get('latituda'); // -0.09184;//
      this.naziv = navParams.get('naziv');
    }
  
    ionViewDidLoad() {
        this.loadMap();
        this.getLocation();
    }

    getLocation(){

      this.geolocation.getCurrentPosition().then((resp) => {
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);
       }).catch((error) => {
         console.log('Error getting location', error);
       });

    }

    loadMap(){
      const location = new google.maps.LatLng(this.longituda, this.latituda);

      const options = {
        center: location,
        zoom: 15
        //mapTypeId: 'hybrid'
    }

      const map = new google.maps.Map(this.mapRef.nativeElement, options);

      //za izmjenu mape
      //setTimeout(() => map.setMapTypeId('satellite'), 3000);

      this.addMarker(location, map);
    }

    addMarker(position, map){
      return new google.maps.Marker({
        position,
        map,
        title: this.naziv
      });
    }  
  }

  