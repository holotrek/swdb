import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from 'ionic-cache';

/*
  Generated class for the SwapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SwapiProvider {
    private _apiUrl = 'https://swapi.co/api/';

    constructor(
        private http: HttpClient,
        private cache: CacheService
    ) {
    }

    clearCache(key: string) {
        this.cache.clearGroup(key);
    }

    getPeople(name?: string, forceReload?: boolean): Promise<SwapiCollection<Person>> {
        const search = name ? `?search=${name}` : '';
        const url = `${this._apiUrl}people${search}`;
        const request = this.http.get<SwapiCollection<Person>>(url);
        const items = this.cache.loadFromObservable(url, request, SWAPI_CACHE_KEYS.people);
        return items.toPromise();
    }

    getPeoplePage(url: string): Promise<SwapiCollection<Person>> {
        const request = this.http.get<SwapiCollection<Person>>(url);
        const items = this.cache.loadFromObservable(url, request, SWAPI_CACHE_KEYS.people);
        return items.toPromise();
    }

}

export const SWAPI_CACHE_KEYS = {
    people: 'swapi-people'
};

export interface SwapiCollection<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface SwapiEntity {
    created: Date;
    edited: Date;
    url: string;
}

export interface Person extends SwapiEntity {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
}
