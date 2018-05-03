import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { PersonPage } from './person';

@NgModule({
    declarations: [
        PersonPage,
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(PersonPage),
    ],
})
export class PersonPageModule { }
