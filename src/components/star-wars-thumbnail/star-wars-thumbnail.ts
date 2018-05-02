import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { StarWarsThumbnailProvider } from '../../providers/star-wars-thumbnail/star-wars-thumbnail';

/**
 * Generated class for the StarWarsThumbnailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'star-wars-thumbnail',
    templateUrl: 'star-wars-thumbnail.html'
})
export class StarWarsThumbnailComponent {

    base64: SafeUrl;
    @Input() fallbackIcon: string;
    @Input() set name(name: string) {
        this.thumbnailProvider.getImage(name)
            .then(img => this.base64 = img ? this.domSanitizer.bypassSecurityTrustUrl(img) : null);
    }

    constructor(
        private thumbnailProvider: StarWarsThumbnailProvider,
        private domSanitizer: DomSanitizer
    ) {
    }

}
