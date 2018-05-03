import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-person',
    templateUrl: 'person.html',
})
export class PersonPage {
    name: string;
    url: string;

    constructor(
        private navCtrl: NavController, 
        private navParams: NavParams
    ) {
    }

    ionViewDidLoad() {
        this.name = this.navParams.get('name');
        this.url = this.navParams.get('url');
    }

}
