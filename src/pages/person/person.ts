import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Person, SwapiProvider, Species, SWAPI_CACHE_KEYS } from '../../providers/swapi/swapi';

/**
 * Generated class for the PersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-person',
    templateUrl: 'person.html',
})
export class PersonPage {
    name: string;
    person: Promise<Person>;

    constructor(
        private navCtrl: NavController, 
        private navParams: NavParams,
        private swapiProvider: SwapiProvider,
        private toast: ToastController
    ) {
    }

    ionViewDidLoad() {
        this.name = this.navParams.get('name');
        this.load(this.navParams.get('url'));
    }

    load(url: string) {
        let loading = this.toast.create({
            message: 'Loading Details...'
        });
        this.person = loading.present().then(() => this.swapiProvider.getPerson(url));
        this.person.then(p => loading.dismiss());
    }

}
