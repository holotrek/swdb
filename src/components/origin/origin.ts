import { Component, Input } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';

import { Person, Planet, SwapiProvider } from '../../providers/swapi/swapi';
import { HomeworldPage } from '../../pages/homeworld/homeworld';

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
        private toast: ToastController
    ) {
    }

    load() {
        let loading = this.toast.create({
            message: 'Loading origin...'
        });
        this.homeworld = loading.present().then(() => this.swapiProvider.getPlanet(this.person.homeworld));
        this.homeworld.then(() => loading.dismiss());
    }

    viewPlanet(h: Planet) {
        this.navCtrl.push(HomeworldPage, {
            url: h.url,
            name: h.name
        });
    }

}
