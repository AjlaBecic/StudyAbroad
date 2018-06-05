import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AddScolarship } from '../addScolarship/addScolarship';

@Component({
  selector: 'page-scolarship',
  templateUrl: 'scolarship.html'
})
export class Scolarship {
  query: string;
  grad: string;
  oblast: string;
  ciklus: string;
  gradovi: Array<{ value: number, naziv: string}>;
  stipendije: Array<{ id: number, naslov: string, ciklus: string, trajanje: string, oblast: string, grad: string, link: number}>;
  oblasti: Array<{id: number, naziv: string}>;

  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    this.gradovi = 
    [
      { value: 1, naziv: 'Amsterdam'}, { value: 2, naziv: 'Beč'},
      { value: 3, naziv: 'Beograd'}, { value: 4, naziv: 'Berlin'},
      { value: 5, naziv: 'Graz'}, { value: 6, naziv: 'Novi Sad'},
      { value: 7, naziv: 'London'}, { value: 8, naziv: 'Zagreb'},
      { value: 9, naziv: 'Madrid'}, { value: 10, naziv: 'Barcelona'}
    ];

    this.stipendije = [];
    this.query = "";

    this.oblasti = 
    [
      { id: 1, naziv: "IT"}, { id: 2, naziv: "Arhitektura"}, { id: 3, naziv: "Masinstvo"}, 
      { id: 4, naziv: "Gradjevina"}, { id: 5, naziv: "Likovna"}, { id: 6, naziv: "Medicina"}
    ];

    this.gradovi = this.sortArray(this.gradovi);
    this.oblasti = this.sortArray(this.oblasti);
    
      
  }

  ionViewDidLoad(){
    this.query = "";
    this.getScolarships();

  }

  offer(){
    this.navCtrl.push(AddScolarship);

  }

  search(){
    this.query = "";
    if((this.grad != null && this.grad != "") || (this.oblast != null && this.oblast != "") || (this.ciklus != null && this.ciklus != "")) this.query += (" WHERE ");
    if(this.grad != null && this.grad != "") this.query += "grad = '" + this.grad + "'";
    if(this.query != "") this.query += (", ");
    if(this.oblast != null && this.oblast != "") this.query += (" oblast='" + this.oblast + "'");
    if(this.query != "") this.query += (", ");
    if(this.ciklus != null && this.ciklus != "") this.query += (" ciklus='" + this.ciklus + "'");

    this.getScolarships();
  }

  getScolarships(){
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {    
        db.executeSql("SELECT * FROM scolarship " + this.query + " ORDER BY id DESC", {})
        .then(res => {
          for(var i=0; i<res.rows.length; i++) {
            this.stipendije.push({id:res.rows.item(i).id,naslov:res.rows.item(i).naslov,ciklus:res.rows.item(i).ciklus,trajanje:res.rows.item(i).trajanje,oblast:res.rows.item(i).oblast,grad:res.rows.item(i).grad,link:res.rows.item(i).link})
          }
        })
        .catch(e => {});
      }).catch(e => {});
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

