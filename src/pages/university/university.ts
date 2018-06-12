import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ViewChild } from '@angular/core/src/metadata/di';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker
  } from '@ionic-native/google-maps';

  declare var google;

@Component({
    selector: 'page-university',
    templateUrl: 'university.html'
  })
  export class University {
    
    /*map: GoogleMap;
    naslov: string;
  
    constructor(public navCtrl: NavController, private sqlite: SQLite) {
  
    }
  
    ionViewDidLoad() {
        this.loadMap();
    }
    
    loadMap() {
        
            // Create a map after the view is ready and the native platform is ready.
    this.map = GoogleMaps.create('map_canvas');
    this.naslov = "necu";
    
    }*/

    @ViewChild('map') mapElement: ElementRef;
    map: any;
   
    constructor(public navCtrl: NavController) {
   
    }

   
    ionViewDidLoad(){
      this.loadMap();
    }
   
    loadMap(){
   
      let latLng = new google.maps.LatLng(-34.9290, 138.6010);
   
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
   
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
   
    }
  
  }

  