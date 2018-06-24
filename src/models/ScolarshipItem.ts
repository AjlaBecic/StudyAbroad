import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

export class ScolarshipItem{
    constructor(public id: string, public naslov: string, public ciklus: string, public trajanje: string, public oblast: string, public grad: string, public link: string,
        public navCtrl: NavController, public fdb: AngularFireDatabase){}
    
    addItem(){
        let toSave = {
            naslov: this.naslov,
            ciklus: this.grad,
            trajanje: this.trajanje,
            oblast: this.trajanje.toLocaleString(),
            grda: this.oblast,
            link: this.link
        }
        this.fdb.list('scolarships').push(toSave);
    }
}