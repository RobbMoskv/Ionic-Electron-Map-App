import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AgmCoreModule.forRoot({
      // apiKey: '',
    }),
    BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { 
      provide: APP_INITIALIZER, 
      useFactory: initMaps,
      deps: [MapsAPILoader],
      multi: true
    }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Load Google Map on init of the app
function initMaps(mapLoader: MapsAPILoader): () => Promise<void> {
  return () => mapLoader.load();
}