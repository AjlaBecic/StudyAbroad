import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Scolarship } from '../pages/scolarship/scolarship';
import { Job } from '../pages/job/job';
import { JobOffer } from '../pages/jobOffer/jobOffer';
import { Blog } from '../pages/blog/blog';
import { AddStory } from '../pages/addStory/addStory';
import { ShowMap } from '../pages/showMap/showMap';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;//= HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Stipendije', component: Scolarship },
      { title: 'Posao', component: Job },
      { title: 'Objavi ponudu za posao', component: JobOffer },
      { title: 'Blog', component: Blog },
      { title: 'Dodaj priču', component: AddStory },
      { title: 'Mapa', component: ShowMap }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.rootPage = HomePage;
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}
