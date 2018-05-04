import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CacheModule } from 'ionic-cache';

import { MachinePageModule } from '../pages/machine/machine.module';
import { PeoplePageModule } from '../pages/people/people.module';
import { PersonPageModule } from '../pages/person/person.module';
import { SwapiProvider } from '../providers/swapi/swapi';
import { MyApp } from './app.component';

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CacheModule.forRoot(),
        IonicModule.forRoot(MyApp),
        PeoplePageModule,
        PersonPageModule,
        MachinePageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        SwapiProvider
    ]
})
export class AppModule { }
