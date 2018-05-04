import { Component, Input } from '@angular/core';

import { Machine } from '../../providers/swapi/swapi';

/**
 * Generated class for the MachineDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'machine-details',
    templateUrl: 'machine-details.html'
})
export class MachineDetailsComponent {

    @Input() machine: Machine;
    @Input() type: string;

}
