import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { StarWarsThumbnailComponent } from './star-wars-thumbnail/star-wars-thumbnail';

@NgModule({
	declarations: [StarWarsThumbnailComponent],
	imports: [IonicModule],
	exports: [StarWarsThumbnailComponent]
})
export class ComponentsModule {}
