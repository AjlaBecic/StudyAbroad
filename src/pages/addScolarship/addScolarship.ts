import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private fdb: AngularFireDatabase, private toastCtrl: ToastController) {
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
    if(this.naslov == null || this.ciklus == null || this.trajanje == null || this.oblast == null || this.grad == null || this.link == null){
      this.presentToast("Niste ispunili sva polja za unos.");
      return;
    }
    if(this.getDaysNumber(new Date(), new Date(this.trajanje.toLocaleString())) >= 0){
      this.presentToast("Datum do kojeg traje konkurs mora biti iza današnjeg dana.");
      return;
    }
    if(!(this.link.startsWith("http://") || this.link.startsWith("https://"))){
      this.presentToast("Link koji ste unijeli nije validan.");
      return;
    }

    var item = new ScolarshipItem('', this.naslov, this.ciklus, this.trajanje.toLocaleString(), this.oblast, this.grad, this.link, 0, this.navCtrl, this.fdb);
    item.addItem();                        
    this.navCtrl.push(Scolarship, { gradovi: this.gradovi });
  }

  getDaysNumber(date1, date2){
    var diff = date1.getTime() - date2.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24)); 
  }

  presentToast(mess) {
    const toast = this.toastCtrl.create({
      message: mess,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}