import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';
import { CacheService } from 'ionic-cache';

import { PeoplePage } from '../pages/people/people';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = PeoplePage;

    pages: Array<{ title: string, component: any, icon: string }>;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private cache: CacheService
    ) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Characters', component: PeoplePage, icon: 'contacts' }
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            // Configure caching
            this.cache.setDefaultTTL(60 * 60 * 24); // TODO: If upgrade to Ionic4, use new environment settings for this config
            this.cache.setOfflineInvalidate(false);
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
