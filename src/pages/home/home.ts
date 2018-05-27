import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { ListPage } from '../list/list';
import { Scolarship } from '../scolarship/scolarship';
import { Job } from '../job/job';
import { Blog } from '../blog/blog';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages: Array<{title: string, component: any}>;
  jobs: Array<{id:number, naslov: string, grad: string, firma: string}>;

  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    this.pages = [
      { title: 'List', component: ListPage },
      { title: 'Stipendije', component: Scolarship },
      { title: 'Posao', component: Job },
      { title: 'Blog', component: Blog }
    ];

    this.jobs = [];
  }

  nextpage(page:string) {
    //this.navCtrl.push(this.pages.find(item => item.title == page).component);
    this.navCtrl.setRoot(this.pages.find(item => item.title == page).component);
  }

  ionViewDidLoad(){
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS jobs(id INTEGER PRIMARY KEY, firma TEXT, trajanje TEXT, oblast TEXT, grad TEXT, telefon TEXT, email TEXT, naslov TEXT, link TEXT)', {})
       .then(res => {this.jobs.push({id:100,firma:"database success",naslov:"ss",grad:"ss"})})
       .catch(e => {this.jobs.push({id:101,firma:"database unsuccess",naslov:"ss",grad:"ss"})});

       db.executeSql('CREATE TABLE IF NOT EXISTS scolarship(id INTEGER PRIMARY KEY, naslov TEXT, ciklus TEXT, trajanje TEXT, oblast TEXT, grad TEXT, konkurs NUMBER)', {})
       .then(res => {this.jobs.push({id:100,firma:"database success",naslov:"ss",grad:"ss"})})
       .catch(e => {this.jobs.push({id:101,firma:"database unsuccess",naslov:"ss",grad:"ss"})});

       db.executeSql("INSERT INTO jobs(firma, trajanje, oblast, grad, telefon, email, naslov, link) VALUES('aa' , 'aa', 'aa' , 'aa' , 'aa' ,'aa' ,'aa' , 'aa' )" , {})
       .then(res => {
                   
         //this.navCtrl.setRoot(Job);
       })
       .catch(e => {       })
    
        /*db.executeSql("INSERT INTO scolarship (naslov, ciklus, trajanje, oblast, grad, konkurs) VALUES ('Konkurs za dodjelu Erasmus stipendija baza', 'Master', 'Dva semestra', 'IT', 'Graz', 2)", {})
        .then(res => {this.jobs.push({id:102,firma:"insert success",naslov:"ss",grad:"ss"})})
        .catch(e => {this.jobs.push({id:103,firma:"insert unsuccess",naslov:"ss",grad:"ss"})});

        db.executeSql("INSERT INTO scolarship (naslov, ciklus, trajanje, oblast, grad, konkurs) VALUES ('Konkurs za dodjelu Erasmus stipendija baza', 'Master', 'Dva semestra', 'IT', 'Graz', 2)", {})
        .then(res => {this.jobs.push({id:102,firma:"insert success",naslov:"ss",grad:"ss"})})
        .catch(e => {this.jobs.push({id:103,firma:"insert unsuccess",naslov:"ss",grad:"ss"})});*/

      }).catch(e => {this.jobs.push({id:105,firma:e,naslov:"ss",grad:"ss"})});
  }

}
