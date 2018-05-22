import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { JobOffer } from '../jobOffer/jobOffer';

@Component({
  selector: 'page-job',
  templateUrl: 'job.html'
})
export class Job {

  gradovi: Array<{ value: number, naziv: string}>;
  jobs: Array<{naslov: string, grad: string, firma: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.gradovi = 
    [
      { value: 1, naziv: 'Amsterdam'}, { value: 2, naziv: 'Beč'},
      { value: 3, naziv: 'Beograd'}, { value: 4, naziv: 'Berlin'},
      { value: 5, naziv: 'Graz'}, { value: 6, naziv: 'Novi Sad'},
      { value: 7, naziv: 'London'}, { value: 8, naziv: 'Zagreb'},
      { value: 9, naziv: 'Madrid'}, { value: 10, naziv: 'Barcelona'}
    ];


    this.jobs = navParams.get('posao');
    /*[
      {naslov: "IT stručnjak za web", grad: "Beč", firma: "Solutions"},
      {naslov: "Računovođa - studentski posao", grad: "Grac", firma: "UniCreditBank"},
      {naslov: "Trgovac", grad: "Berlin", firma: "Zara"},
      {naslov: "IT stručnjak za web", grad: "Zagreb", firma: "Solutions"}
    ]*/

    this.gradovi.sort((item1,item2) => {
        if (item1.naziv > item2.naziv) {
          return 1;
        }
        if (item1.naziv < item2.naziv) {
            return -1;
        }
        return 0;});
  }

  offer(){
    this.navCtrl.push(JobOffer);

  }

}



