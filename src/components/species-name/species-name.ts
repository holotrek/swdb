import { Component, Input } from '@angular/core';

import { SwapiProvider } from '../../providers/swapi/swapi';

/**
 * Generated class for the SpeciesNameComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'species-name',
    templateUrl: 'species-name.html'
})
export class SpeciesNameComponent {

    name: string;

    @Input() set url(url: string) {
        if (url) {
            this.load(url);
        }
    }

    constructor(
        private swapiProvider: SwapiProvider
    ) {
    }

    load(url: string) {
        this.swapiProvider.getSpecie(url).then(s => this.name = s.name);
    }

}
