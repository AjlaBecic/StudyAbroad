import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

  declare var google : any;

@Component({
    selector: 'page-showMap',
    templateUrl: 'showMap.html'
  })
  export class ShowMap {
    @ViewChild('map') mapRef: ElementRef;
 
    longituda : number;
    latituda : number;
  
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.longituda = 51.51279;//navParams.get('longituda');
      this.latituda = -0.09184;//navParams.get('latituda');
    }
  
    ionViewDidLoad() {
        this.loadMap();
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
        title: 'ajla'
      });
    }  
  }

  