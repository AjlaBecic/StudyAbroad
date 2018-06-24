import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

export class JobItem {
    constructor(public id: string, public firma: string, public naslov: string, public grad: string, public oblast: string, public telefon: string, public email: string, public link: string, public trajanje: Date,
        public navCtrl: NavController, private fdb: AngularFireDatabase){
        
    }

    addItem(){
        let toSave = {
            naslov: this.naslov,
            grad: this.grad,
            firma: this.firma,
            trajanje: this.trajanje.toLocaleString(),
            oblast: this.oblast,
            telefon: this.telefon,
            email: this.email,
            link: this.link
          }
          this.fdb.list('jobs').push(toSave);
    }
}