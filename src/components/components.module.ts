import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { FilmsComponent } from './films/films';
import { MachineDetailsComponent } from './machine-details/machine-details';
import { MachinesComponent } from './machines/machines';
import { OriginComponent } from './origin/origin';
import { PersonDetailsComponent } from './person-details/person-details';
import { PlanetDetailsComponent } from './planet-details/planet-details';
import { SpeciesNameComponent } from './species-name/species-name';

@NgModule({
	declarations: [
		SpeciesNameComponent,
		PersonDetailsComponent,
		FilmsComponent,
		OriginComponent,
		MachinesComponent,
		MachineDetailsComponent,
		PlanetDetailsComponent,
	],
	imports: [
		CommonModule,
		IonicModule
	],
	exports: [
		SpeciesNameComponent,
		PersonDetailsComponent,
		FilmsComponent,
		OriginComponent,
		MachinesComponent,
		MachineDetailsComponent,
		PlanetDetailsComponent
	]
})
export class ComponentsModule { }
