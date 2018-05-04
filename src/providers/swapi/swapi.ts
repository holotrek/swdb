import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs/Observable';

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

    searchPeople(name?: string, forceReload?: boolean): Promise<SwapiCollection<Person>> {
        const search = name ? `?search=${name}` : '';
        const url = `${this._apiUrl}people${search}`;
        const request = this.http.get<SwapiCollection<Person>>(url);
        const items = this.cache.loadFromObservable(url, request, SWAPI_CACHE_KEYS.people) as Observable<SwapiCollection<Person>>;
        return items.toPromise();
    }

    getPeople(url: string): Promise<SwapiCollection<Person>> {
        return this.getCollection<Person>(url, SWAPI_CACHE_KEYS.people);
    }

    getPerson(url: string): Promise<Person> {
        return this.getSingle<Person>(url, SWAPI_CACHE_KEYS.people);
    }

    getSpecie(url: string): Promise<Species> {
        return this.getSingle<Species>(url, SWAPI_CACHE_KEYS.species);
    }

    getFilm(url: string): Promise<Film> {
        return this.getSingle<Film>(url, SWAPI_CACHE_KEYS.films);
    }

    getPlanet(url: string): Promise<Planet> {
        return this.getSingle<Planet>(url, SWAPI_CACHE_KEYS.planets);
    }

    getVehicle(url: string): Promise<Vehicle> {
        return this.getSingle<Vehicle>(url, SWAPI_CACHE_KEYS.vehicles);
    }

    getStarship(url: string): Promise<Starship> {
        return this.getSingle<Starship>(url, SWAPI_CACHE_KEYS.starships);
    }

    private getSingle<E extends SwapiEntity>(url: string, cacheKey: string): Promise<E> {
        const request = this.http.get<E>(url);
        const items = this.cache.loadFromObservable(url, request, cacheKey) as Observable<E>;
        return items.toPromise();
    }

    private getCollection<E extends SwapiEntity>(url: string, cacheKey: string): Promise<SwapiCollection<E>> {
        const request = this.http.get<SwapiCollection<E>>(url);
        const items = this.cache.loadFromObservable(url, request, cacheKey) as Observable<SwapiCollection<E>>;
        return items.toPromise();
    }

}

export const SWAPI_CACHE_KEYS = {
    people: 'swapi-people',
    species: 'swapi-species',
    films: 'swapi-films',
    planets: 'swapi-planets',
    vehicles: 'swapi-vehicles',
    starships: 'swapi-starships'
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

export interface Species extends SwapiEntity {
    name: string;
	classification: string;
	designation: string;
	average_height: string;
	skin_colors: string;
	hair_colors: string;
	eye_colors: string;
	average_lifespan: string;
	homeworld: string;
	language: string;
}

export interface Film extends SwapiEntity {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
}

export interface Planet extends SwapiEntity {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
}

export interface Machine extends SwapiEntity {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
}

export interface Vehicle extends Machine {
    vehicle_class: string;
}

export interface Starship extends Machine {
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
}
