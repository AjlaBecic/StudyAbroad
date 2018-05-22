import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { Toast } from '@ionic-native/toast';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Scolarship } from '../pages/scolarship/scolarship';
import { Job } from '../pages/job/job';
import { JobOffer } from '../pages/jobOffer/jobOffer';
import { Blog } from '../pages/blog/blog';
import { BlogStory } from '../pages/blogStory/blogStory';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Scolarship,
    Job,
    JobOffer,
    Blog,
    BlogStory
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Scolarship,
    Job,
    JobOffer,
    Blog,
    BlogStory
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}//,
    //SQLite,
    //Toast
  ]
})
export class AppModule {}
