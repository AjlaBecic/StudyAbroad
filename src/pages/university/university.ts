import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker
  } from '@ionic-native/google-maps';

@Component({
    selector: 'page-university',
    templateUrl: 'university.html'
  })
  export class University {
    pages: Array<{title: string, component: any}>;
    map: GoogleMap;
  
    constructor(public navCtrl: NavController, private sqlite: SQLite) {
      
  
    }
  
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
  