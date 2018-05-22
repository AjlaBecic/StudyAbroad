import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-scolarship',
  templateUrl: 'scolarship.html'
})
export class Scolarship {
  gradovi: Array<{ value: number, naziv: string}>;
  stipendije: Array<{ id: number, naslov: string, ciklus: string, trajanje: string, oblast: string, grad: string, konkurs: number}>;
  oblast: Array<{number, string}>;

  constructor(public navCtrl: NavController) {
    this.gradovi = 
    [
      { value: 1, naziv: 'Amsterdam'}, { value: 2, naziv: 'Beč'},
      { value: 3, naziv: 'Beograd'}, { value: 4, naziv: 'Berlin'},
      { value: 5, naziv: 'Graz'}, { value: 6, naziv: 'Novi Sad'},
      { value: 7, naziv: 'London'}, { value: 8, naziv: 'Zagreb'},
      { value: 9, naziv: 'Madrid'}, { value: 10, naziv: 'Barcelona'}
    ];

    this.stipendije = 
    [
      { id: 1, naslov: "Konkurs za dodjelu Erasmus stipendija", ciklus: "Master", trajanje: "Dva semestra", oblast:"IT", grad: "Graz", konkurs: 0},
      { id: 2, naslov: "Konkurs za dodjelu Erasmus stipendija", ciklus: "Master", trajanje: "Dva semestra", oblast:"IT", grad: "Graz", konkurs: 0},
      { id: 3, naslov: "Konkurs za dodjelu Erasmus stipendija", ciklus: "Master", trajanje: "Dva semestra", oblast:"IT", grad: "Graz", konkurs: 0}      
    ];

    this.oblast = 
    [
      { id: 1, naziv: "IT"}, { id: 2, naziv: "Arhitektura"}, { id: 3, naziv: "Masinstvo"}, 
      { id: 4, naziv: "Gradjevina"}, { id: 5, naziv: "Likovna"}, { id: 6, naziv: "Medicina"}
    ];

    this.gradovi = this.sortArray(this.gradovi);
      
  }

  sortArray(niz){
    niz.sort((item1,item2) => {
      if (item1.naziv > item2.naziv) {
        return 1;
      }
      if (item1.naziv < item2.naziv) {
          return -1;
      }
      return 0;});

      return niz;
  }

}

