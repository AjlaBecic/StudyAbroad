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

  search(){
   /*this.query = "";
    if((this.grad != null && this.grad != "") || (this.oblast != null && this.oblast != "") || (this.ciklus != null && this.ciklus != "")) this.query += (" WHERE ");
    if(this.grad != null && this.grad != "") this.query += "grad = '" + this.grad + "'";
    if(this.query != "") this.query += (", ");
    if(this.oblast != null && this.oblast != "") this.query += (" oblast='" + this.oblast + "'");
    if(this.query != "") this.query += (", ");
    if(this.ciklus != null && this.ciklus != "") this.query += (" ciklus='" + this.ciklus + "'");

    this.getScolarships();*/
  }

  getScolarships(){
    /*this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {    
        db.executeSql("SELECT * FROM scolarship " + this.query + " ORDER BY id DESC", {})
        .then(res => {
          for(var i=0; i<res.rows.length; i++) {
            this.stipendije.push({id:res.rows.item(i).id,naslov:res.rows.item(i).naslov,ciklus:res.rows.item(i).ciklus,trajanje:res.rows.item(i).trajanje,oblast:res.rows.item(i).oblast,grad:res.rows.item(i).grad,link:res.rows.item(i).link})
          }
        })
        .catch(e => {});
      }).catch(e => {});*/

      this.stipendije = [];
      var ref = this.fdb.list('/scolarships/');   
      ref.snapshotChanges().forEach(changes => {
          changes.forEach(x => 
          {
            if(this.grad != null && this.grad != "" && x.payload.val().grad != this.grad) return;
            if(this.oblast != null && this.oblast != "" && x.payload.val().oblast != this.oblast) return;
            if(this.ciklus != null && this.ciklus != "" && x.payload.val().ciklus != this.ciklus) return;
            this.stipendije.push(new ScolarshipItem(x.key, x.payload.val().naslov, x.payload.val().ciklus, x.payload.val().trajanje, x.payload.val().oblast, x.payload.val().grad, x.payload.val().link, this.navCtrl, this.fdb));
          });

      });
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

