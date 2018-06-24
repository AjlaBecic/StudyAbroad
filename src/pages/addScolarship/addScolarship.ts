import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AngularFireDatabase } from 'angularfire2/database';

import { Scolarship } from '../scolarship/scolarship';
import { ScolarshipItem } from '../../models/ScolarshipItem';
import { City } from '../../models/City';

@Component({
  selector: 'page-addScolarship',
  templateUrl: 'addScolarship.html'
})
export class AddScolarship {
  gradovi: Array<City>;
  ciklus: string;
  trajanje: Date;
  oblast: string;
  grad: string;
  naslov: string;
  link: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private fdb: AngularFireDatabase) {
    this.gradovi = navParams.get('gradovi');

    this.gradovi.sort((item1,item2) => {
      if (item1.naziv > item2.naziv) {
        return 1;
      }
      if (item1.naziv < item2.naziv) {
          return -1;
      }
      return 0;});
      
  }

  addOffer(){
    /*this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

        db.executeSql("INSERT INTO scolarship(naslov, ciklus, trajanje, oblast, grad, link) VALUES('" + this.naslov + "','" + this.ciklus + "','" + this.trajanje.toLocaleString() 
          + "','" + this.oblast + "','" + this.grad + "','"  + this.link + "')" , {})
        .then(res => {                    
          this.navCtrl.setRoot(Scolarship);
        })
        .catch(e => {  this.naslov = this.trajanje.toLocaleString() + this.link + e;      })
            
      }).catch(e => {this.naslov = e;});*/

      var item = new ScolarshipItem('', this.naslov, this.ciklus, this.trajanje.toLocaleString(), this.oblast, this.grad, this.link, this.navCtrl, this.fdb);
      item.addItem();                        
      this.navCtrl.push(Scolarship, { gradovi: this.gradovi });
  }

}