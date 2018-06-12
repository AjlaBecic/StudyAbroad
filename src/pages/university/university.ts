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
        
            // Create a map after the view is ready and the native platform is ready.
    this.map = this.gmap.create('map_canvas');
    this.naslov = "necu";
    
    }
  
  }

  