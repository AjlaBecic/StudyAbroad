import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Blog } from '../blog/blog';
import { BlogItem } from '../../models/BlogItem';

@Component({
  selector: 'page-addStory',
  templateUrl: 'addStory.html'
})
export class AddStory {

    blog: Array<{id: number, naslov: string, tekst: string, email: string}>;
    naslov: string;
    tekst: string;
    email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private sqlite: SQLite, private fdb: AngularFireDatabase) {}

  addOffer(){
    /*this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

        db.executeSql("INSERT INTO blog(naslov, tekst, email) VALUES('" + this.naslov + "','" + this.tekst + "','" + this.email + "')" , {})
        .then(res => {                    
          this.navCtrl.push(Blog);
        })
        .catch(e => {})
            
      }).catch(e => {});*/
      var item = new BlogItem('', this.naslov, this.tekst, this.email, this.fdb);
      item.addItem();                        
      this.navCtrl.push(Blog);
  }

}



