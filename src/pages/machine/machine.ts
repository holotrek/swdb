import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { HttpAlertProvider } from '../../providers/http-alert/http-alert';
import { Machine, SwapiProvider } from '../../providers/swapi/swapi';

/**
 * Generated class for the MachinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-machine',
    templateUrl: 'machine.html',
})
export class MachinePage {
    name: string;
    type: string;
    machine: Promise<Machine>;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private swapiProvider: SwapiProvider,
        private toast: ToastController,
        private alert: HttpAlertProvider
    ) {
    }

    ionViewDidLoad() {
        this.name = this.navParams.get('name');
        this.type = this.navParams.get('type');
        this.load(this.navParams.get('url'), this.type);
    }

    load(url: string, type: string) {
        let loading = this.toast.create({
            message: 'Loading details...'
        });
        this.machine = loading.present().then(() => this.getMachine(url, type));
        this.machine
            .then(() => loading.dismiss())
            .catch(err => {
                loading.dismiss();
                this.alert.showHttpErrorAlert();
            });
    }

    getMachine(url: string, type: string): Promise<Machine> {
        return type === 'starships' ? this.swapiProvider.getStarship(url) : this.swapiProvider.getVehicle(url);
    }

}
