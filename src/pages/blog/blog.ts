import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html'
})
export class Blog {
    stories: Array<{naslov: string, tekst: string}>;

  constructor(public navCtrl: NavController) {
	  this.story = 'popular';
    
    this.stories=
    [
        {naslov: "Moja prva prica", tekst:"gagaggagagaga"}, {naslov: "Moja prva prica", tekst:"gagaggagagaga"},
        {naslov: "Moja prva prica", tekst:"gagaggagagaga"}, {naslov: "Moja prva prica", tekst:"gagaggagagaga"},
        {naslov: "Moja prva prica", tekst:"gagaggagagaga"}, {naslov: "Moja prva prica", tekst:"gagaggagagaga"},
        {naslov: "Moja prva prica", tekst:"gagaggagagaga"}, {naslov: "Moja prva prica", tekst:"gagaggagagaga"},
        {naslov: "Moja prva prica", tekst:"gagaggagagaga"}, {naslov: "Moja prva prica", tekst:"gagaggagagaga"},
        {naslov: "Moja prva prica", tekst:"gagaggagagaga"}, {naslov: "Moja prva prica", tekst:"gagaggagagaga"},
        {naslov: "Moja prva prica", tekst:"gagaggagagaga"}, {naslov: "Moja prva prica", tekst:"gagaggagagaga"}
    ]
  }

}