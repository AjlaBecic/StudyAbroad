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
    naslov: string;
  
    constructor(public navCtrl: NavController, private sqlite: SQLite) {
      
  
    }
  
    ionViewDidLoad() {
        this.loadMap();
    }
    
    loadMap() {
        
            // Create a map after the view is ready and the native platform is ready.
    //this.map = this.googleMaps.create('map_canvas');
    this.map = GoogleMaps.create('map_canvas');
    
        // Wait the maps plugin is ready until the MAP_READY event
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
    
    
          this.naslov='map is ready to use.';
    
    
        }).catch( err =>{ this.naslov = err;});;
    
          }
  
}
  