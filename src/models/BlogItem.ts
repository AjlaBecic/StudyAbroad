import { AngularFireDatabase } from 'angularfire2/database';

export class BlogItem {
    constructor(public id: string, public naslov: string, public tekst: string, public email: string, public fdb: AngularFireDatabase){}

    addItem(){
        let toSave = {
            naslov: this.naslov,
            tekst: this.tekst,
            email: this.email
        }
        this.fdb.list('blog').push(toSave);
    }
}