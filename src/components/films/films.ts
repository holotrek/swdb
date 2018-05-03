import { Component, Input } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { Film, SwapiProvider } from '../../providers/swapi/swapi';

/**
 * Generated class for the FilmsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'films',
    templateUrl: 'films.html'
})
export class FilmsComponent {

    films: Film[];

    @Input() set url(url: string) {
        if (url) {
            this.load(url);
        }
    }

    constructor(
        private swapiProvider: SwapiProvider,
        private toast: ToastController
    ) {
    }

    load(url: string) {
        let loading = this.toast.create({
            message: 'Loading Films...'
        });
        loading.present().then(() => this.getFilms(url))
            .then(fs => {
                this.films = fs;
                this.films.sort((a, b) => a.episode_id > b.episode_id ? 1 : -1);
            })
            .then(() => loading.dismiss());
    }

    getFilms(url: string) {
        return this.swapiProvider.getPerson(url)
            .then(p => {
                const filmPromises = p.films.map(v => this.swapiProvider.getFilm(v));
                return Promise.all(filmPromises);
            });
    }

}
