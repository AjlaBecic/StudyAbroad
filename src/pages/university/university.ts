import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';

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
        
            // Create a map after the view is ready and the native platform is ready.
    this.map = GoogleMaps.create('map_canvas');
    
        // No longer wait GoogleMapsEvent.MAP_READY event
        // ( except you use map.getVisibleRegion() )
          }
  
}
  