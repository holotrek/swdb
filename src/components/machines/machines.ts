import { Component, Input } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { MachinePage } from '../../pages/machine/machine';
import { Machine, Person, SwapiProvider } from '../../providers/swapi/swapi';

/**
 * Generated class for the MachinesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'machines',
    templateUrl: 'machines.html'
})
export class MachinesComponent {

    private _person: Person;
    private _type: string;

    @Input() set person(p: Person) {
        this._person = p;
        this.load();
    }
    get person(): Person {
        return this._person;
    }
    
    @Input() set type(t: string) {
        this._type = t;
        this.load();
    }
    get type(): string {
        return this._type;
    }

    machines: Machine[];

    constructor(
        private navCtrl: NavController,
        private swapiProvider: SwapiProvider,
        private toast: ToastController
    ) {
    }

    load() {
        if (this.person && this.type) {
            const urls = this.person[this.type];
            let loading = this.toast.create({
                message: `Loading ${this.type}...`
            });
            loading.present().then(() => this.getMachines(urls))
                .then(ms => this.machines = ms)
                .then(() => loading.dismiss());
        }
    }

    getMachines(urls: string[]): Promise<Machine[]> {
        const proms = urls.map(v => this.getMachine(v));
        return Promise.all(proms);
    }

    getMachine(url: string): Promise<Machine> {
        return this.type === 'starships' ? this.swapiProvider.getStarship(url) : this.swapiProvider.getVehicle(url);
    }

    viewDetails(m: Machine) {
        this.navCtrl.push(MachinePage, {
            name: m.name,
            url: m.url,
            type: this.type
        });
    }

}
