import { Component, Input } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { Person, SwapiProvider } from '../../providers/swapi/swapi';

/**
 * Generated class for the PersonDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'person-details',
    templateUrl: 'person-details.html'
})
export class PersonDetailsComponent {

    person: Promise<Person>;

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
            message: 'Loading Details...'
        });
        this.person = loading.present().then(() => this.swapiProvider.getPerson(url));
        this.person.then(p => loading.dismiss());
    }

}
