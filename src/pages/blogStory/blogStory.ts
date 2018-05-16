import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-blogStory',
  templateUrl: 'blogStory.html'
})
export class BlogStory {
    naslov:string;
    tekst:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.naslov = navParams.get('naslov');
    this.tekst = navParams.get('tekst');
  }


}