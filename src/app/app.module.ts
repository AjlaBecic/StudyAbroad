import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SQLite } from '@ionic-native/sqlite';
import { EmailComposer } from '@ionic-native/email-composer';
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Scolarship } from '../pages/scolarship/scolarship';
import { AddScolarship } from '../pages/addScolarship/addScolarship';
import { Job } from '../pages/job/job';
import { JobOffer } from '../pages/jobOffer/jobOffer';
import { Blog } from '../pages/blog/blog';
import { BlogStory } from '../pages/blogStory/blogStory';
import { AddStory } from '../pages/addStory/addStory';
import { University } from '../pages/university/university';
import { ShowMap } from '../pages/showMap/showMap';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

var config = {
  apiKey: "AIzaSyDJbKP4AyMqP_0lGhSrtWiQaXNA3MfkW70",
  authDomain: "abroad-8bb52.firebaseapp.com",
  databaseURL: "https://abroad-8bb52.firebaseio.com",
  projectId: "abroad-8bb52",
  storageBucket: "abroad-8bb52.appspot.com",
  messagingSenderId: "531617326067"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Scolarship,
    AddScolarship,
    Job,
    JobOffer,
    Blog,
    BlogStory,
    AddStory,
    University,
    ShowMap
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Scolarship,
    AddScolarship,
    Job,
    JobOffer,
    Blog,
    BlogStory,
    AddStory,
    University,
    ShowMap
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    EmailComposer,
    Geolocation
  ]
})
export class AppModule {}
