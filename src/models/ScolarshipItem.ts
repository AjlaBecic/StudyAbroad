import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

export class ScolarshipItem{
    constructor(public id: string, public naslov: string, public ciklus: string, 
        public trajanje: string, public oblast: string, public grad: string, 
        public link: string, public konkurs: number, public navCtrl: NavController, 
        public fdb: AngularFireDatabase){}
    
    addItem(){
        let toSave = {
            naslov: this.naslov,
            ciklus: this.ciklus,
            trajanje: this.trajanje,
            oblast: this.oblast,
            grad: this.grad,
            link: this.link
        }
        this.fdb.list('scolarships').push(toSave);
    }
}