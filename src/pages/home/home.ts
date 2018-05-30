import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { EmailComposer } from '@ionic-native/email-composer';

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

  constructor(public navCtrl: NavController, private sqlite: SQLite/*, private emailComposer: EmailComposer, private _EMAIL: EmailProvider*/) {
    this.pages = [
      { title: 'List', component: ListPage },
      { title: 'Stipendije', component: Scolarship },
      { title: 'Posao', component: Job },
      { title: 'Blog', component: Blog }
    ];

  }

  nextpage(page:string) {
    //this.navCtrl.push(this.pages.find(item => item.title == page).component);
    this.navCtrl.push(this.pages.find(item => item.title == page).component);
  }

  ionViewDidLoad(){
    this.sqlite.create({
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



      }).catch(e => {});


      /*this.emailComposer.isAvailable().then((available: boolean) =>{
        if(available) {
          //Now we know we can send
        }
       });
       
       let email = {
         to: 'ajlabecic26@gmail.com',
         cc: '',
         bcc: [],
         attachments: [],
         subject: 'Cordova Icons',
         body: 'How are you? Nice greetings from Leipzig',
         isHtml: true
       };
       
       // Send a text message using default options
       this.emailComposer.open(email);*/
  }

}
