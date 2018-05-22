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
  jobs: any = [];

  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    this.pages = [
      { title: 'List', component: ListPage },
      { title: 'Stipendije', component: Scolarship },
      { title: 'Posao', component: Job },
      { title: 'Blog', component: Blog }
    ];
  }

  nextpage(page:string) {
    //this.navCtrl.push(this.pages.find(item => item.title == page).component);
    this.navCtrl.setRoot(this.pages.find(item => item.title == page).component, {posao: this.jobs});
  }

  ionViewDidLoad(){
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS jobs(id INTEGER PRIMARY KEY, firma TEXT, objava TEXT, trajanje TEXT, opis TEXT, oblast TEXT, grad TEXT)', {})
       .then(res => {})
       .catch(e => {});
    
        db.executeSql("INSERT INTO jobs (firma, objava, trajanje, opis, oblast, grad) VALUES ('Solutions', 'danas', '20 dana', 'hhhh', 'it', 'Zagreb')", {})
        .then(res => {     })
        .catch(e => {});
    
        db.executeSql('SELECT * FROM jobs ORDER BY id DESC', {})
        .then(res => {
          this.jobs = [];
          for(var i=0; i<res.rows.length; i++) {
            this.jobs.push({id:res.rows.item(i).id,firma:res.rows.item(i).firma,naslov:res.rows.item(i).objava,grad:res.rows.item(i).grad})
          }
        })
        .catch(e => {});
      }).catch(e => {});
  }

}
