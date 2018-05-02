import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from 'ionic-cache';
import * as GoogleImages from 'google-images';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';

/*
  Generated class for the StarWarsThumbnailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StarWarsThumbnailProvider {
    private _cacheKey = 'star-wars-images';
    constructor(
        private http: HttpClient,
        private cache: CacheService,
        private imageService: GoogleImages
    ) { 
    }

    async getImage(name: string): Promise<string> {
        try {
            const obs = await this.getImageFromWeb(name);
            const cachedObs = this.cache.loadFromObservable(name, obs, this._cacheKey);
            return cachedObs.toPromise();
        }
        catch (err) {
            // Log error, but just return nothing
            console.error(err);
            return null;
        }
    }
    
    private async getImageFromWeb(name: string): Promise<Observable<string>> {
        try {
            const imgs = await this.imageService.search(name);
            if (!imgs || imgs.length === 0) {
                return Observable.throw('image not found');
            }
            else {
                const img = imgs[0];
                const url = img.thumbnail ? img.thumbnail.url : img.url;
                return this.http.get(url, { responseType: 'blob' })
                    .mergeMap(async (val: Blob) => {
                        return await this.getBase64FromBlob(val);
                    });
            }
        }
        catch (err) {
            // Log error, but just return nothing
            console.error(err);
            return null;
        }
    }

    private getBase64FromBlob(image: Blob): Promise<string> {
        return new Promise<string>(resolve => {
            let reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result), false);
            reader.readAsDataURL(image);
        });
    }

}
