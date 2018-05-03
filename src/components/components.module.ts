import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { FilmsComponent } from './films/films';
import { OriginComponent } from './origin/origin';
import { PersonDetailsComponent } from './person-details/person-details';
import { SpeciesNameComponent } from './species-name/species-name';

@NgModule({
	declarations: [
		SpeciesNameComponent,
		PersonDetailsComponent,
		FilmsComponent,
		OriginComponent
	],
	imports: [
		CommonModule,
		IonicModule
	],
	exports: [
		SpeciesNameComponent,
		PersonDetailsComponent,
		FilmsComponent,
		OriginComponent
	]
})
export class ComponentsModule { }
