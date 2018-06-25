import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

  declare var google : any;

@Component({
    selector: 'page-showMap',
    templateUrl: 'showMap.html'
  })
  export class ShowMap {
    @ViewChild('map') mapRef: ElementRef;
 
    longituda : number;
    latituda : number;
    currentlat: number;
    currentlong: number;
    naziv: string;
    currentLocation: any;
    location: any;
    map: any;
    distance: string;
  
    constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
      this.longituda = +navParams.get('longituda'); //51.51279;//
      this.latituda = +navParams.get('latituda'); // -0.09184;//
      this.naziv = navParams.get('naziv');
    }
  
    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap(){
      this.geolocation.getCurrentPosition().then((resp) => {
        this.currentlat = resp.coords.latitude;
        this.currentlong = resp.coords.longitude;
        this.currentLocation = new google.maps.LatLng(this.currentlat, this.currentlong);
        this.location = new google.maps.LatLng(this.latituda, this.longituda);
        const options = {
          center: this.location,
          zoom: 15
        }
        window.alert(resp.coords.latitude);
  
        this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  
        this.addMarker(this.location, this.map);
        this.addMarker(this.currentLocation, this.map);

        this.getDirection(this.location, this.currentLocation);
        this.getDistance(resp.coords.latitude, resp.coords.longitude, this.latituda, this.longituda);

       }).catch((error) => {
         console.log('Error getting location', error);
       });
    }

    addMarker(position, map){
      return new google.maps.Marker({
        position,
        map,
        title: this.naziv
      });
    } 

    getDirection(location, currentlocation){
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(this.map);
      directionsService.route({
        origin: currentlocation,
        destination: location,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

    getDistance(lat1, lon1, lat2, lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
      var dLon = this.deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      this.distance = (R * c).toFixed(2); // Distance in km
    }
  
    deg2rad(deg) {
      return deg * (Math.PI/180)
    } 
  }

  