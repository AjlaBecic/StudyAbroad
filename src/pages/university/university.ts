import { Component } from '@angular/core';
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
  
}
  