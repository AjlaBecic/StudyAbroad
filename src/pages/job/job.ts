import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { JobOffer } from '../jobOffer/jobOffer';

@Component({
  selector: 'page-job',
  templateUrl: 'job.html'
})
export class Job {

  gradovi: Array<{ value: number, naziv: string}>;
  jobs: Array<{id:number, naslov: string, grad: string, firma: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
    this.gradovi = 
    [
      { value: 1, naziv: 'Amsterdam'}, { value: 2, naziv: 'Beč'},
      { value: 3, naziv: 'Beograd'}, { value: 4, naziv: 'Berlin'},
      { value: 5, naziv: 'Graz'}, { value: 6, naziv: 'Novi Sad'},
      { value: 7, naziv: 'London'}, { value: 8, naziv: 'Zagreb'},
      { value: 9, naziv: 'Madrid'}, { value: 10, naziv: 'Barcelona'}
    ];


    //this.jobs = navParams.get('posao');
    /*[
      {naslov: "IT stručnjak za web", grad: "Beč", firma: "Solutions"},
      {naslov: "Računovođa - studentski posao", grad: "Grac", firma: "UniCreditBank"},
      {naslov: "Trgovac", grad: "Berlin", firma: "Zara"},
      {naslov: "IT stručnjak za web", grad: "Zagreb", firma: "Solutions"}
    ]*/

    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.jobs.push({id:105,firma:"connection success",naslov:"ss",grad:"ss"})
    
        db.executeSql('SELECT * FROM jobs ORDER BY id DESC', {})
        .then(res => {
          this.jobs = [];
          for(var i=0; i<res.rows.length; i++) {
            this.jobs.push({id:res.rows.item(i).id,firma:res.rows.item(i).firma,naslov:res.rows.item(i).objava,grad:res.rows.item(i).grad})
          }
        })
        .catch(e => {this.jobs.push({id:104,firma:"select success",naslov:"ss",grad:"ss"})});
      }).catch(e => {this.jobs.push({id:105,firma:e,naslov:"ss",grad:"ss"})});

    this.gradovi.sort((item1,item2) => {
        if (item1.naziv > item2.naziv) {
          return 1;
        }
        if (item1.naziv < item2.naziv) {
            return -1;
        }
        return 0;});
  }

  offer(){
    this.navCtrl.push(JobOffer);

  }

}



