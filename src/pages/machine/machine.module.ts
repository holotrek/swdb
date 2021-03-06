import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { MachinePage } from './machine';

@NgModule({
    declarations: [
        MachinePage,
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(MachinePage),
    ],
})
export class MachinePageModule { }
