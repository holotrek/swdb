import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the HttpAlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpAlertProvider {

    constructor(
        private alert: AlertController
    ) {
    }

    showHttpErrorAlert() {
        this.alert.create({
            title: 'Error',
            message: `An error occurred with the search. You may be offline and not yet have the data stored on your device.`,
            buttons: ['OK']
        }).present();
    }
}
