import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AngularFireDatabase } from 'angularfire2/database';


import { Job } from '../job/job';
import { JobItem } from '../../models/JobItem';
import { City } from '../../models/City';

@Component({
  selector: 'page-jobOffer',
  templateUrl: 'jobOffer.html'
})
export class JobOffer {
  gradovi: Array<City>;
  firma: string;
  trajanje: Date;
  oblast: string;
  grad: string;
  telefon: string;
  email: string;
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

        db.executeSql("INSERT INTO jobs(firma, trajanje, oblast, grad, telefon, email, naslov, link) VALUES('" + this.firma + "','" + this.trajanje.toLocaleString() 
          + "','" + this.oblast + "','" + this.grad + "','" + this.telefon + "','" + this.email + "','" + this.naslov + "','" + this.link + "')" , {})
        .then(res => {                    
          this.navCtrl.push(Job);
        })
        .catch(e => {  this.naslov = this.trajanje.toLocaleString() + this.link + e;      })
            
      }).catch(e => {this.naslov = e;});*/

      var item = new JobItem('', this.firma, this.naslov, this.grad, this.oblast, this.telefon, this.email, this.link, this.trajanje, this.navCtrl, this.fdb);
      item.addItem();                    
      this.navCtrl.push(Job, { gradovi: this.gradovi });

  }

}