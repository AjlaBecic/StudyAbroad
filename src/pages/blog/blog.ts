import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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
    naslov: string;
    tekst: string;
    email: string;
    story: any;

  constructor(public navCtrl: NavController, private sqlite: SQLite, private emailComposer: EmailComposer, private fdb: AngularFireDatabase, private toastCtrl: ToastController) {
    
    this.stories = [];
  }

  open(Id:string) {
    this.navCtrl.push(BlogStory, {naslov: this.stories.find(item => item.id == Id).naslov, tekst: this.stories.find(item => item.id == Id).tekst});
    
  }

  ionViewDidLoad(){
      this.getStories();
  }

  getStories(){
    this.stories = [];
    var ref = this.fdb.list('/blog/');   
    ref.snapshotChanges().forEach(changes => {
        changes.forEach(x => 
        {
          this.stories.push(new BlogItem(x.key, x.payload.val().naslov, x.payload.val().tekst, x.payload.val().email, this.fdb));
        });

    });
  }

  addOffer(){
      var item = new BlogItem('', this.naslov, this.tekst, this.email, this.fdb);
      item.addItem();           

      const toast = this.toastCtrl.create({
        message: 'Uspješno ste dodali priču.',
        position: 'bottom',
        showCloseButton: true
      });
      toast.present();

      toast.onDidDismiss(() => {
        this.naslov = '';
        this.tekst = '';
        this.email = '';
      });
  }

  presentToast(mess) {
    const toast = this.toastCtrl.create({
      message: mess,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
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