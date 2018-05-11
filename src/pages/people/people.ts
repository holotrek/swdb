import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { HttpAlertProvider } from '../../providers/http-alert/http-alert';
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
    searching: boolean;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private swapiProvider: SwapiProvider,
        private toast: ToastController,
        private alert: HttpAlertProvider
    ) {
    }

    ionViewDidLoad() {
        this.load();
    }

    load() {
        let loading = this.toast.create({
            message: 'Loading...'
        });
        return loading.present().then(() => 
            this.swapiProvider.searchPeople().then(res => {
                this.items = res.results;
                this.next = res.next;
            }))
            .then(() => loading.dismiss())
            .catch(err => {
                loading.dismiss();
                this.alert.showHttpErrorAlert();
            });
    }

    loadMore(): Promise<any> {
        if (!this.next) {
            return Promise.resolve();
        }
        return this.swapiProvider.getPeople(this.next).then(res => {
            this.items = this.items.concat(res.results);
            this.next = res.next;
        }).catch(err => this.alert.showHttpErrorAlert());
    }

    search($event) {
        const term = $event.target.value;
        if (term && term.length > 1) {
            this.doSearch(term);
        }
        else if (!term) {
            this.doSearch();
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

    private doSearch(search?: string) {
        this.searching = true;
        this.swapiProvider.searchPeople(search).then(res => {
            this.items = res.results;
            this.next = res.next;
            this.searching = false;
        }).catch(err => {
            this.searching = false;
            this.alert.showHttpErrorAlert();
        });
    }
}
