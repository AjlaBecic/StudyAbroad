import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


import { ShowMap } from '../showMap/showMap';
import { UniversityItem } from '../../models/UniversityItem'
import { City } from '../../models/City'

@Component({
    selector: 'page-university',
    templateUrl: 'university.html'
  })
  export class University {
    uni: Array<UniversityItem>;
    gradovi: Array<City>;
    grad: string;
  
    constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) {
      this.uni = [];
      this.gradovi = navParams.get('gradovi');
      this.gradovi = this.sortArray(this.gradovi);
    }
  
    ionViewDidLoad() {
      this.getUni();
    }

    getUni(){
        this.uni = [];
        var ref = this.fdb.list('/universities/');   
        ref.snapshotChanges().forEach(changes => {
            changes.forEach(x => 
            {
              if(this.grad != null && this.grad != "" && x.payload.val().grad != this.grad) return;
              this.uni.push(new UniversityItem(x.key, x.payload.val().naziv, x.payload.val().grad, x.payload.val().latituda, x.payload.val().longituda));
            });
  
        });
    }

    openMap(Id:string){
      this.navCtrl.push(ShowMap, {naziv: this.uni.find(item => item.id == Id).naziv, latituda: this.uni.find(item => item.id == Id).latituda, longituda: this.uni.find(item => item.id == Id).longituda, gradovi: this.gradovi });
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

  