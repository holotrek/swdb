import { Component, Input } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { HttpAlertProvider } from '../../providers/http-alert/http-alert';
import { Film, Person, SwapiProvider } from '../../providers/swapi/swapi';

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

    @Input() set person(p: Person) {
        if (p) {
            this.load(p.films);
        }
    }

    films: Film[];

    constructor(
        private swapiProvider: SwapiProvider,
        private toast: ToastController,
        private alert: HttpAlertProvider
    ) {
    }

    load(urls: string[]) {
        let loading = this.toast.create({
            message: 'Loading films...'
        });
        loading.present().then(() => this.getFilms(urls))
            .then(fs => {
                this.films = fs;
                this.films.sort((a, b) => a.episode_id > b.episode_id ? 1 : -1);
            })
            .then(() => loading.dismiss())
            .catch(err => {
                loading.dismiss();
                this.alert.showHttpErrorAlert();
            });
    }

    getFilms(urls: string[]): Promise<Film[]> {
        const filmPromises = urls.map(v => this.swapiProvider.getFilm(v));
        return Promise.all(filmPromises);
    }

}
