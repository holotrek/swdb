import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Person, SWAPI_CACHE_KEYS, SwapiProvider } from '../../providers/swapi/swapi';
import { PersonPage } from '../person/person';

/**
 * Generated class for the PeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-people',
    templateUrl: 'people.html',
})
export class PeoplePage {
    items: Person[];
    next: string;
    curSearch: string;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private swapiProvider: SwapiProvider,
        private toast: ToastController
    ) {
    }

    ionViewDidLoad() {
        this.load();
    }

    load(search?: string) {
        let loading = this.toast.create({
            message: search ? 'Searching...' : 'Loading...'
        });
        return loading.present().then(() => 
            this.swapiProvider.searchPeople(search).then(res => {
                this.items = res.results;
                this.next = res.next;
            }))
            .then(() => loading.dismiss());
    }

    loadMore(): Promise<any> {
        if (!this.next) {
            return Promise.resolve();
        }
        return this.swapiProvider.getPeople(this.next).then(res => {
            this.items = this.items.concat(res.results);
            this.next = res.next;
        });
    }

    search($event) {
        const term = $event.target.value;
        if (term && term.length > 1) {
            this.load(term);
        }
        else if (!term) {
            this.load();
        }
    }

    forceReload(refresher) {
        this.swapiProvider.clearCache(SWAPI_CACHE_KEYS.people);
        this.load().then(() => refresher.complete());
    }

    viewDetails(person: Person) {
        this.navCtrl.push(PersonPage, {
            name: person.name,
            url: person.url
        });
    }
}
