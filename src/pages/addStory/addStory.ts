import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Blog } from '../blog/blog';
//import { EmailProvider } from '../../providers/email/email';

@Component({
  selector: 'page-addStory',
  templateUrl: 'addStory.html'
})
export class AddStory {

    blog: Array<{id: number, naslov: string, tekst: string, email: string}>;
    naslov: string;
    tekst: string;
    email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite/*,  private _EMAIL: EmailProvider*/) {
    
  }

  addOffer(){
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

        db.executeSql("INSERT INTO blog(naslov, tekst, email) VALUES('" + this.naslov + "','" + this.tekst + "','" + this.email + "')" , {})
        .then(res => {                    
          this.navCtrl.setRoot(Blog);
        })
        .catch(e => {})
            
      }).catch(e => {});


      //this.tekst = this._EMAIL.sendEmail();
  }

}



