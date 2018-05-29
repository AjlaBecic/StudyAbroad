import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SQLite } from '@ionic-native/sqlite';

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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    AddStory
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
    AddScolarship,
    Job,
    JobOffer,
    Blog,
    BlogStory,
    AddStory
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite
  ]
})
export class AppModule {}
