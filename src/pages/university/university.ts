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
    
    map: GoogleMap;
    naslov: string;
  
    constructor(public navCtrl: NavController, private sqlite: SQLite, private gmap: GoogleMaps) {
  
    }
  
    ionViewDidLoad() {
        this.loadMap();
    }
    
    loadMap() {
        this.map = GoogleMaps.create('map_canvas');
        
            // Wait the maps plugin is ready until the MAP_READY event
            this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        
        
              console.log('map is ready to use.');
        
        
            });
        
    
    }
  
  }

  