/*import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';
import { ViewChild } from '@angular/core/src/metadata/di';

@Component({
    selector: 'page-university',
    templateUrl: 'university.html'
  })
  export class University {
    
    map: GoogleMap;
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
    
    }
  
  }*/

  import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker
  } from '@ionic-native/google-maps';
  import { Component } from '@angular/core';
  import { NavController } from 'ionic-angular';
  import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
  import { ViewChild } from '@angular/core/src/metadata/di';
  
  @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
  })
  export class University {
    map: GoogleMap;
    constructor() { }
  
    ionViewDidLoad() {
      this.loadMap();
    }
  
    loadMap() {
  
      let mapOptions: GoogleMapOptions = {
        camera: {
           target: {
             lat: 43.0741904,
             lng: -89.3809802
           },
           zoom: 18,
           tilt: 30
         }
      };
  
      this.map = GoogleMaps.create('map_canvas', mapOptions);
  
      let marker: Marker = this.map.addMarkerSync({
        title: 'Ionic',
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: 43.0741904,
          lng: -89.3809802
        }
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        alert('clicked');
      });
    }
  }
  