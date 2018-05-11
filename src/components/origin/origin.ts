import { Component, Input } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { HomeworldPage } from '../../pages/homeworld/homeworld';
import { HttpAlertProvider } from '../../providers/http-alert/http-alert';
import { Person, Planet, SwapiProvider } from '../../providers/swapi/swapi';

/**
 * Generated class for the OriginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'origin',
    templateUrl: 'origin.html'
})
export class OriginComponent {

    private _person: Person;
    @Input() set person(p: Person) {
        this._person = p;
        this.load();
    }

    get person(): Person {
        return this._person;
    }

    homeworld: Promise<Planet>;

    constructor(
        private navCtrl: NavController,
        private swapiProvider: SwapiProvider,
        private toast: ToastController,
        private alert: HttpAlertProvider
    ) {
    }

    load() {
        let loading = this.toast.create({
            message: 'Loading origin...'
        });
        this.homeworld = loading.present().then(() => this.swapiProvider.getPlanet(this.person.homeworld));
        this.homeworld
            .then(() => loading.dismiss())
            .catch(err => {
                loading.dismiss();
                this.alert.showHttpErrorAlert();
            });
    }

    viewPlanet(h: Planet) {
        this.navCtrl.push(HomeworldPage, {
            url: h.url,
            name: h.name
        });
    }

}
