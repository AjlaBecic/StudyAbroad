import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { JobOffer } from '../jobOffer/jobOffer';

@Component({
  selector: 'page-job',
  templateUrl: 'job.html'
})
export class Job {

  query: string;
  grad: string;
  oblast: string;
  gradovi: Array<{ value: number, naziv: string}>;
  jobs: Array<{id:number, naslov: string, grad: string, firma: string, trajanje: Date, oblast: string, telefon: string, email: string, link: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
    this.gradovi = 
    [
      { value: 1, naziv: 'Amsterdam'}, { value: 2, naziv: 'Beč'},
      { value: 3, naziv: 'Beograd'}, { value: 4, naziv: 'Berlin'},
      { value: 5, naziv: 'Graz'}, { value: 6, naziv: 'Novi Sad'},
      { value: 7, naziv: 'London'}, { value: 8, naziv: 'Zagreb'},
      { value: 9, naziv: 'Madrid'}, { value: 10, naziv: 'Barcelona'}
    ];

    this.jobs = [];
    this.query = '';

    this.gradovi.sort((item1,item2) => {
        if (item1.naziv > item2.naziv) {
          return 1;
        }
        if (item1.naziv < item2.naziv) {
            return -1;
        }
        return 0;});
  }

  ionViewDidLoad(){
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      //this.jobs.push({id:105,firma:"connection success",naslov:"ss",grad:"ss"})
        /*db.executeSql('CREATE TABLE IF NOT EXISTS jobs(id INTEGER PRIMARY KEY, firma TEXT, objava TEXT, trajanje TEXT, opis TEXT, oblast TEXT, grad TEXT)', {})
       .then(res => {this.jobs.push({id:100,firma:"database success",naslov:"ss",grad:"ss"})})
       .catch(e => {this.jobs.push({id:101,firma:"database unsuccess",naslov:"ss",grad:"ss"})});*/
    
        /*db.executeSql("INSERT INTO jobs (firma, objava, trajanje, opis, oblast, grad) VALUES ('Solutions', 'danas', '20 dana', 'hhhh', 'it', 'Zagreb')", {})
        .then(res => {this.jobs.push({id:102,firma:"insert success",naslov:"ss",grad:"ss"})})
        .catch(e => {this.jobs.push({id:103,firma:"insert unsuccess",naslov:"ss",grad:"ss"})});

        db.executeSql("INSERT INTO jobs (firma, objava, trajanje, opis, oblast, grad) VALUES ('hehehehehhee', 'uspjelooooo', '20 dana', 'hhhh', 'it', 'Zagreb')", {})
        .then(res => {this.jobs.push({id:102,firma:"insert success",naslov:"ss",grad:"ss"})})
        .catch(e => {this.jobs.push({id:103,firma:"insert unsuccess",naslov:"ss",grad:"ss"})});*/
    
        db.executeSql('SELECT * FROM jobs ORDER BY id DESC', {})
        .then(res => {
          this.jobs = [];
          for(var i=0; i<res.rows.length; i++) {
            this.jobs.push({id:res.rows.item(i).id,firma:res.rows.item(i).firma,naslov:res.rows.item(i).naslov,grad:res.rows.item(i).grad,oblast:res.rows.item(i).oblast,telefon:res.rows.item(i).telefon,email:res.rows.item(i).email,link:res.rows.item(i).link,trajanje:new Date(res.rows.item(i).trajanje)})
          }
        })
        .catch(e => {});
      }).catch(e => {});
  }

  search(){
    this.query = "";
    if(this.grad != null && this.grad != "") this.query = "grad = '" + this.grad + "'";
    if(this.grad != null && this.grad != "" && this.oblast != null && this.oblast != "") this.query += (", ");
    if(this.oblast != null && this.oblast != "") this.query += (" oblast='" + this.oblast + "'");
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
    
        db.executeSql("SELECT * FROM jobs WHERE " + this.query + " ORDER BY id DESC", {})
        .then(res => {
          this.jobs = [];
          for(var i=0; i<res.rows.length; i++) {
            this.jobs.push({id:res.rows.item(i).id,firma:res.rows.item(i).firma,naslov:res.rows.item(i).naslov,grad:res.rows.item(i).grad,oblast:res.rows.item(i).oblast,telefon:res.rows.item(i).telefon,email:res.rows.item(i).email,link:res.rows.item(i).link,trajanje:new Date(res.rows.item(i).trajanje)})
          }
        })
        .catch(e => {});
      }).catch(e => {});
  }

  offer(){
    this.navCtrl.push(JobOffer);

  }

}



