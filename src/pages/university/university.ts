import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { ViewChild } from '@angular/core/src/metadata/di';
/*import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker
  } from '@ionic-native/google-maps';*/

  declare var google : any;

@Component({
    selector: 'page-university',
    templateUrl: 'university.html'
  })
  export class University {
    @ViewChild('map') mapRef: ElementRef;
    
    map: any;
    naslov: string;
  
    constructor(public navCtrl: NavController, private sqlite: SQLite/*, private gmap: GoogleMaps*/) {
  
    }
  
    ionViewDidLoad() {
        //this.loadMap();
        console.log(this.mapRef);
        this.showMap();
    }

    showMap(){
      const location = new google.maps.LatLng(51.507351, -0.127758);

      const options = {
        center: location,
        zoom: 10
      }

      this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    }
    
    loadMap() {

        /*this.map = GoogleMaps.create('map_canvas');
        
            // Wait the maps plugin is ready until the MAP_READY event
            this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        
        
              console.log('map is ready to use.');
        
        
            }).catch(err => console.log(err));*/
        
    
    }
  
  }

  