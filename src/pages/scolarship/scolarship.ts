import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AddScolarship } from '../addScolarship/addScolarship';
import { AngularFireDatabase } from 'angularfire2/database';

import {ScolarshipItem} from '../../models/ScolarshipItem';
import { City } from '../../models/City';

@Component({
  selector: 'page-scolarship',
  templateUrl: 'scolarship.html'
})
export class Scolarship {
  query: string;
  grad: string;
  oblast: string;
  ciklus: string;
  gradovi: Array<City>;
  stipendije: Array<ScolarshipItem>;
  oblasti: Array<{id: number, naziv: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private fdb: AngularFireDatabase) {
    
    this.gradovi = navParams.get('gradovi');

    this.stipendije = [];
    this.query = "";

    this.oblasti = 
    [
      { id: 1, naziv: "IT"}, { id: 2, naziv: "Arhitektura"}, { id: 3, naziv: "Masinstvo"}, 
      { id: 4, naziv: "Gradjevina"}, { id: 5, naziv: "Likovna"}, { id: 6, naziv: "Medicina"}
    ];

    this.gradovi = this.sortArray(this.gradovi);
    this.oblasti = this.sortArray(this.oblasti);
    
      
  }

  ionViewDidLoad(){
    this.query = "";
    this.getScolarships();

  }

  offer(){
    this.navCtrl.push(AddScolarship, { gradovi: this.gradovi });

  }

  getScolarships(){

      this.stipendije = [];
      var ref = this.fdb.list('/scolarships/');   
      ref.snapshotChanges().forEach(changes => {
          changes.forEach(x => 
          {
            if(this.grad != null && this.grad != "" && x.payload.val().grad != this.grad) return;
            if(this.oblast != null && this.oblast != "" && x.payload.val().oblast != this.oblast) return;
            if(this.ciklus != null && this.ciklus != "" && x.payload.val().ciklus != this.ciklus) return;
            this.stipendije.push(new ScolarshipItem(x.key, x.payload.val().naslov, x.payload.val().ciklus, x.payload.val().trajanje, x.payload.val().oblast, x.payload.val().grad, x.payload.val().link, this.getDaysNumber(new Date(x.payload.val().trajanje), new Date()), this.navCtrl, this.fdb));
          });

      });
  }

  getDaysNumber(date1, date2){
    var diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24)); 
  }

  sortArray(niz){
    niz.sort((item1,item2) => {
      if (item1.naziv > item2.naziv) {
        return 1;
      }
      if (item1.naziv < item2.naziv) {
          return -1;
      }
      return 0;});

      return niz;
  }

}

