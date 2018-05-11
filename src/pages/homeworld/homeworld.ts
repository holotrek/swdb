import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { HttpAlertProvider } from '../../providers/http-alert/http-alert';
import { Planet, SwapiProvider } from '../../providers/swapi/swapi';

/**
 * Generated class for the HomeworldPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-homeworld',
    templateUrl: 'homeworld.html',
})
export class HomeworldPage {
    name: string;
    homeworld: Promise<Planet>;

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
        this.load(this.navParams.get('url'));
    }

    load(url: string) {
        let loading = this.toast.create({
            message: 'Loading details...'
        });
        this.homeworld = loading.present().then(() => this.swapiProvider.getPlanet(url));
        this.homeworld
            .then(() => loading.dismiss())
            .catch(err => {
                loading.dismiss();
                this.alert.showHttpErrorAlert();
            });
    }
}
