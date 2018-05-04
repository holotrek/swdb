import { Component, Input } from '@angular/core';

import { Planet } from '../../providers/swapi/swapi';

/**
 * Generated class for the PlanetDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'planet-details',
    templateUrl: 'planet-details.html'
})
export class PlanetDetailsComponent {

    @Input() planet: Planet;

}
