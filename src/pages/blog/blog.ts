import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { EmailComposer } from '@ionic-native/email-composer';
import { AngularFireDatabase } from 'angularfire2/database';

import { BlogStory } from '../blogStory/blogStory';
import { BlogItem } from '../../models/BlogItem'

@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html'
})
export class Blog {
    stories: Array<BlogItem>;

  constructor(public navCtrl: NavController, private sqlite: SQLite, private emailComposer: EmailComposer, private fdb: AngularFireDatabase) {
    
    this.stories = [];
  }

  open(Id:string) {
    //this.navCtrl.push(this.pages.find(item => item.title == page).component);
    this.navCtrl.push(BlogStory, {naslov: this.stories.find(item => item.id == Id).naslov, tekst: this.stories.find(item => item.id == Id).tekst});
    
  }

  ionViewDidLoad(){
    /*this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {    
        db.executeSql('SELECT * FROM blog ORDER BY id DESC', {})
        .then(res => {
          this.stories = [];
          for(var i=0; i<res.rows.length; i++) {
            this.stories.push(new BlogItem(res.rows.item(i).id, res.rows.item(i).naslov, res.rows.item(i).tekst, res.rows.item(i).email));
          }
        })
        .catch(e => {});
      }).catch(e => {});*/
      this.stories = [];
      var ref = this.fdb.list('/blog/');   
      ref.snapshotChanges().forEach(changes => {
          changes.forEach(x => 
          {
            this.stories.push(new BlogItem(x.key, x.payload.val().naslov, x.payload.val().tekst, x.payload.val().email));
          });

      });
  }

  sendEmail(adress: string, title: string){
    let email = {
      to: adress,
      cc: '',
      attachments: [],
      subject: 'Odgovor na StudyAbroad priču: ' + title,
      body: '',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }

}