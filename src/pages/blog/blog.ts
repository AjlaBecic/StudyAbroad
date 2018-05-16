import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BlogStory } from '../blogStory/blogStory';

@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html'
})
export class Blog {
    stories: Array<{id: number, naslov: string, tekst: string}>;

  constructor(public navCtrl: NavController) {
    
    this.stories=
    [
        {id: 1, naslov: "Moja prva prica", tekst:"gagaggagagaga"}, {id: 2, naslov: "Moja prva prica", tekst:"gagaggagagaga"},
        {id: 3, naslov: "Moja prva prica", tekst:"gagaggagagaga"}, {id: 4, naslov: "Moja prva prica", tekst:"gagaggagagaga"},
        {id: 5, naslov: "Moja prva prica", tekst:"gagaggagagaga"}, {id: 6, naslov: "Moja prva prica", tekst:"gagaggagagaga"},
        {id: 7, naslov: "Moja prva prica", tekst:"gagaggagagaga"}, {id: 8, naslov: "Moja prva prica", tekst:"gagaggagagaga"},
        {id: 9, naslov: "Moja prva prica", tekst:"gagaggagagaga"}, {id: 10, naslov: "Moja prva prica", tekst:"gagaggagagaga"},
        {id: 11, naslov: "Moja prva prica", tekst:"gagaggagagaga"}, {id: 12, naslov: "Moja prva prica", tekst:"gagaggagagaga"},
        {id: 13, naslov: "Moja prva prica", tekst:"gagaggagagaga"}, {id: 14, naslov: "Moja prva prica", tekst:"gagaggagagaga"}
    ]
  }

  open(Id:number) {
    //this.navCtrl.push(this.pages.find(item => item.title == page).component);
    this.navCtrl.setRoot(BlogStory, {naslov: this.stories.find(item => item.id == Id).naslov, tekst: this.stories.find(item => item.id == Id).tekst});
    
  }

}