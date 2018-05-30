import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { EmailComposer } from '@ionic-native/email-composer';

import { BlogStory } from '../blogStory/blogStory';

@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html'
})
export class Blog {
    stories: Array<{id: number, naslov: string, tekst: string, email: string}>;

  constructor(public navCtrl: NavController, private sqlite: SQLite/*, private emailComposer: EmailComposer*/) {
    
    this.stories = [];
  }

  open(Id:number) {
    //this.navCtrl.push(this.pages.find(item => item.title == page).component);
    this.navCtrl.push(BlogStory, {naslov: this.stories.find(item => item.id == Id).naslov, tekst: this.stories.find(item => item.id == Id).tekst});
    
  }

  ionViewDidLoad(){
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {    
        db.executeSql('SELECT * FROM blog ORDER BY id DESC', {})
        .then(res => {
          this.stories = [];
          for(var i=0; i<res.rows.length; i++) {
            this.stories.push({id:res.rows.item(i).id,naslov:res.rows.item(i).naslov,tekst:res.rows.item(i).tekst,email:res.rows.item(i).email})
          }
        })
        .catch(e => {});
      }).catch(e => {});
  }

  /*sendEmail(adress: string, title: string){
    let email = {
      to: adress,
      cc: '',
      attachments: [],
      subject: 'Odgovor na StudyAbroad priču: ' + title,
      body: '',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }*/

}