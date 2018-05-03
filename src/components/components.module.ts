import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { FilmsComponent } from './films/films';
import { PersonDetailsComponent } from './person-details/person-details';
import { SpeciesNameComponent } from './species-name/species-name';

@NgModule({
	declarations: [
		SpeciesNameComponent,
		PersonDetailsComponent,
		FilmsComponent
	],
	imports: [
		CommonModule,
		IonicModule
	],
	exports: [
		SpeciesNameComponent,
		PersonDetailsComponent,
		FilmsComponent
	]
})
export class ComponentsModule { }
