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

}
