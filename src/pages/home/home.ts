import { Component } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';

import { ListPage } from '../list/list';
import { Proba } from '../proba/proba';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController) {
    this.pages = [
      { title: 'List', component: ListPage },
      { title: 'Proba', component: Proba }
    ];
  }

  nextpage(page:string) {
    //this.navCtrl.push(this.pages.find(item => item.title == page).component);
    this.navCtrl.setRoot(this.pages.find(item => item.title == page).component);
  }

}
