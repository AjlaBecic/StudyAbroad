import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


import { Job } from '../job/job';

@Component({
  selector: 'page-jobOffer',
  templateUrl: 'jobOffer.html'
})
export class JobOffer {
  gradovi: Array<{ value: number, naziv: string}>;
  firma: any;
  trajanje: any;
  oblast: any;
  grad: any;
  telefon: any;
  email: any;
  naslov: any;
  link: any;

  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    this.gradovi = 
    [
      { value: 1, naziv: 'Amsterdam'}, { value: 2, naziv: 'Beč'},
      { value: 3, naziv: 'Beograd'}, { value: 4, naziv: 'Berlin'},
      { value: 5, naziv: 'Graz'}, { value: 6, naziv: 'Novi Sad'},
      { value: 7, naziv: 'London'}, { value: 8, naziv: 'Zagreb'},
      { value: 9, naziv: 'Madrid'}, { value: 10, naziv: 'Barcelona'}
    ];

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
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

        db.executeSql('INSERT INTO jobs(firma, trajanje, oblast, grad, telefon, email, naslov, link) VALUES(' + this.firma + ',' + this.trajanje.toLocaleString() 
          + ',' + this.oblast + ',' + this.grad + ',' + this.telefon + ',' + this.email + ',' + this.naslov + ',' + this.link + ')' , {})
        .then(res => {
                    
          this.navCtrl.setRoot(Job);})
        .catch(e => {  this.naslov = e;        db.executeSql("INSERT INTO jobs(firma, trajanje, oblast, grad, telefon, email, naslov, link) VALUES('this.firma' , 'this.trajanje.toLocaleString()', 'this.oblast,this.grad' , 'this.telefon' ,'this.email' ,"+ e + " , 'this.link' )" , {})      });

      }).catch(e => {this.naslov = e;});
  }

}