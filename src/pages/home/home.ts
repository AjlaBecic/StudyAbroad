import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AngularFireDatabase } from 'angularfire2/database';

import { ListPage } from '../list/list';
import { Scolarship } from '../scolarship/scolarship';
import { Job } from '../job/job';
import { Blog } from '../blog/blog';
import { University } from '../university/university';
import { City } from '../../models/City'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages: Array<{title: string, component: any}>;
  gradovi = [];

  constructor(public navCtrl: NavController, private sqlite: SQLite, private fdb: AngularFireDatabase) {
    this.pages = [
      { title: 'List', component: ListPage },
      { title: 'Stipendije', component: Scolarship },
      { title: 'Posao', component: Job },
      { title: 'Blog', component: Blog },
      { title: 'Univerzitet', component: University }
    ];

  }

  nextpage(page:string) {
    //this.navCtrl.push(this.pages.find(item => item.title == page).component);
    this.navCtrl.push(this.pages.find(item => item.title == page).component, { gradovi: this.gradovi });
  }

  ionViewDidLoad(){

    this.gradovi = [];
    var ref = this.fdb.list('/cities/');   
    ref.snapshotChanges().forEach(changes => {
        changes.forEach(x => 
        {
          this.gradovi.push(new City(x.key, x.payload.val().naziv));
        });

    });

    /*this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

        //db.executeSql('DROP TABLE scolarship',{});

        db.executeSql('CREATE TABLE IF NOT EXISTS jobs(id INTEGER PRIMARY KEY, firma TEXT, trajanje TEXT, oblast TEXT, grad TEXT, telefon TEXT, email TEXT, naslov TEXT, link TEXT)', {})
       .then(res => {})
       .catch(e => {});

       db.executeSql('CREATE TABLE IF NOT EXISTS scolarship(id INTEGER PRIMARY KEY, naslov TEXT, ciklus TEXT, trajanje TEXT, oblast TEXT, grad TEXT, link TEXT)', {})
       .then(res => {})
       .catch(e => {});

       db.executeSql('CREATE TABLE IF NOT EXISTS blog (id INTEGER PRIMARY KEY, naslov TEXT, tekst TEXT, email TEXT)', {})
       .then(res => {})
       .catch(e => {});
    
        /*db.executeSql("INSERT INTO scolarship (naslov, ciklus, trajanje, oblast, grad, konkurs) VALUES ('Konkurs za dodjelu Erasmus stipendija baza', 'Master', 'Dva semestra', 'IT', 'Graz', 2)", {})
        .then(res => {this.jobs.push({id:102,firma:"insert success",naslov:"ss",grad:"ss"})})
        .catch(e => {this.jobs.push({id:103,firma:"insert unsuccess",naslov:"ss",grad:"ss"})});

        db.executeSql("INSERT INTO scolarship (naslov, ciklus, trajanje, oblast, grad, konkurs) VALUES ('Konkurs za dodjelu Erasmus stipendija baza', 'Master', 'Dva semestra', 'IT', 'Graz', 2)", {})
        .then(res => {this.jobs.push({id:102,firma:"insert success",naslov:"ss",grad:"ss"})})
        .catch(e => {this.jobs.push({id:103,firma:"insert unsuccess",naslov:"ss",grad:"ss"})});*/

       /* db.executeSql("INSERT INTO blog (naslov, tekst, email) VALUES('Moja prva priča', 'Moj prvi tekst priče.', 'ajlaa.be@gmail.com')",{});
        db.executeSql("INSERT INTO blog (naslov, tekst, email) VALUES('Moja prva priča', 'Moj prvi tekst priče.', 'ajlaa.be@gmail.com')",{});
        db.executeSql("INSERT INTO blog (naslov, tekst, email) VALUES('Moja prva priča', 'Moj prvi tekst priče.', 'ajlaa.be@gmail.com')",{});*/



      //}).catch(e => {});
      
  }

}
