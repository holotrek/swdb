import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import * as GoogleImages from 'google-images';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CacheModule } from 'ionic-cache';

import { ComponentsModule } from '../components/components.module';
import { HomePage } from '../pages/home/home';
import { PeoplePageModule } from '../pages/people/people.module';
import { StarWarsThumbnailProvider } from '../providers/star-wars-thumbnail/star-wars-thumbnail';
import { SwapiProvider } from '../providers/swapi/swapi';
import { MyApp } from './app.component';

const GoogleImagesClient = new GoogleImages('011698350505404100665:cunn7b5iov8', 'AIzaSyDO-AsVGzLEUD-qA_z3u1wN8_bOiJWykgM');

@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CacheModule.forRoot(),
        IonicModule.forRoot(MyApp),
        ComponentsModule,
        PeoplePageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        SwapiProvider,
        StarWarsThumbnailProvider,
        { provide: GoogleImages, useValue: GoogleImagesClient }
    ]
})
export class AppModule { }
