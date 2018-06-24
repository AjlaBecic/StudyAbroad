import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { EmailComposer } from '@ionic-native/email-composer';
import { AngularFireDatabase } from 'angularfire2/database';

import { JobOffer } from '../jobOffer/jobOffer';
import { JobItem } from '../../models/JobItem';
import { City } from '../../models/City';

@Component({
  selector: 'page-job',
  templateUrl: 'job.html'
})
export class Job {

  query: string;
  grad: string;
  oblast: string;
  gradovi: Array<City>;
  jobs: Array<JobItem>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private emailComposer: EmailComposer, 
    private fdb: AngularFireDatabase) {
    this.gradovi = navParams.get('gradovi');

    this.jobs = [];
    this.query = "";

    this.gradovi.sort((item1,item2) => {
        if (item1.naziv > item2.naziv) {
          return 1;
        }
        if (item1.naziv < item2.naziv) {
            return -1;
        }
        return 0;});
  }

  ionViewDidLoad(){
    this.query = "";
    this.getJobs();
  }

  /*search(){
    this.query = "";
    if((this.grad != null && this.grad != "") || (this.oblast != null && this.oblast != "")) this.query += (" WHERE ");
    if(this.grad != null && this.grad != "") this.query += "grad = '" + this.grad + "'";
    if(this.grad != null && this.grad != "" && this.oblast != null && this.oblast != "") this.query += (", ");
    if(this.oblast != null && this.oblast != "") this.query += (" oblast='" + this.oblast + "'");

    this.getJobs();
  }*/

  getJobs(){
    /*this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      //this.jobs.push({id:105,firma:"connection success",naslov:"ss",grad:"ss"})
        /*db.executeSql('CREATE TABLE IF NOT EXISTS jobs(id INTEGER PRIMARY KEY, firma TEXT, objava TEXT, trajanje TEXT, opis TEXT, oblast TEXT, grad TEXT)', {})
       .then(res => {this.jobs.push({id:100,firma:"database success",naslov:"ss",grad:"ss"})})
       .catch(e => {this.jobs.push({id:101,firma:"database unsuccess",naslov:"ss",grad:"ss"})});*/
    
        /*db.executeSql("INSERT INTO jobs (firma, objava, trajanje, opis, oblast, grad) VALUES ('Solutions', 'danas', '20 dana', 'hhhh', 'it', 'Zagreb')", {})
        .then(res => {this.jobs.push({id:102,firma:"insert success",naslov:"ss",grad:"ss"})})
        .catch(e => {this.jobs.push({id:103,firma:"insert unsuccess",naslov:"ss",grad:"ss"})});

        db.executeSql("INSERT INTO jobs (firma, objava, trajanje, opis, oblast, grad) VALUES ('hehehehehhee', 'uspjelooooo', '20 dana', 'hhhh', 'it', 'Zagreb')", {})
        .then(res => {this.jobs.push({id:102,firma:"insert success",naslov:"ss",grad:"ss"})})
        .catch(e => {this.jobs.push({id:103,firma:"insert unsuccess",naslov:"ss",grad:"ss"})});*/
    
        /*db.executeSql("SELECT * FROM jobs " + this.query + " ORDER BY id DESC", {})
        .then(res => {
          this.jobs = [];
          for(var i=0; i<res.rows.length; i++) {
            this.jobs.push({id:res.rows.item(i).id,firma:res.rows.item(i).firma,naslov:res.rows.item(i).naslov,grad:res.rows.item(i).grad,oblast:res.rows.item(i).oblast,telefon:res.rows.item(i).telefon,email:res.rows.item(i).email,link:res.rows.item(i).link,trajanje:new Date(res.rows.item(i).trajanje)})
          }
        })
        .catch(e => {});
      }).catch(e => {});*/

      this.jobs = [];
      var ref = this.fdb.list('/jobs/');   
      ref.snapshotChanges().forEach(changes => {
        changes.forEach(x => 
        {
          if(this.grad != null && this.grad != "" && x.payload.val().grad != this.grad) return;
          if(this.oblast != null && this.oblast != "" && x.payload.val().oblast != this.oblast) return;
          this.jobs.push(new JobItem(x.key, x.payload.val().firma, x.payload.val().naslov, x.payload.val().grad, x.payload.val().oblast, x.payload.val().telefon, x.payload.val().email, x.payload.val().link, new Date(x.payload.val().trajanje), this.navCtrl, this.fdb))
        });
 
      });
  }

  offer(){
    this.navCtrl.push(JobOffer, { gradovi: this.gradovi });

  }

  openURL(URL:string){
    window.open(URL,'_system', 'location=yes');
  }

  sendEmail(adress: string, title: string){
    let email = {
      to: adress,
      cc: '',
      attachments: [],
      subject: 'Prijava za posao: ' + title,
      body: '',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }

  call(){
    window.open(`tel:0038761416979`, '_system');
  }
}



