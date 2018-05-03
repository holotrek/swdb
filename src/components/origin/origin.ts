import { Component, Input } from '@angular/core';
import { ToastController } from 'ionic-angular';

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

    person: Promise<Person>;
    homeworld: Promise<Planet>;

    @Input() set url(url: string) {
        if (url) {
            this.load(url);
        }
    }

    constructor(
        private swapiProvider: SwapiProvider,
        private toast: ToastController
    ) {
    }

    load(url: string) {
        let loading = this.toast.create({
            message: 'Loading Origin...'
        });
        this.person = loading.present().then(() => this.swapiProvider.getPerson(url));
        this.homeworld = this.person.then(p => this.swapiProvider.getPlanet(p.homeworld));
        this.homeworld.then(() => loading.dismiss());
    }

}
