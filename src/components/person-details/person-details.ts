import { Component, Input } from '@angular/core';

import { Person } from '../../providers/swapi/swapi';

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

    @Input() person: Person;

}
