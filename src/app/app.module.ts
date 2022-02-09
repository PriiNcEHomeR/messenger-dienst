import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore,getFirestore, connectFirestoreEmulator, enableMultiTabIndexedDbPersistence } from '@angular/fire/firestore';
import { provideFunctions,getFunctions, connectFunctionsEmulator } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideStorage,getStorage, connectStorageEmulator } from '@angular/fire/storage';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp(environment.firebase))
        ,provideAuth(() => {
            const auth = getAuth();
            if (environment.emulator) {
              connectAuthEmulator(auth, 'http://localhost:9099');
            }
            // setPersistence(auth, { type: 'LOCAL' })
            //   .then(() => console.log('Local Persistence working'))
            //   .catch((e) => console.error('Local Persistence not working', e));
      
            return auth;
          }),
          provideMessaging(() => getMessaging()),
          // provideDatabase(() => getDatabase()),
          provideFirestore(() => {
            const firestore = getFirestore();
            if (environment.emulator) {
              connectFirestoreEmulator(firestore, 'localhost', 8080);
            }
            enableMultiTabIndexedDbPersistence(firestore)
              .then(() => console.log('Multi Tab Storage working'))
              .catch((e) => console.error('Multi Tab Storage isnt working', e));
            return firestore;
          }),
          provideStorage(() => {
            const storage = getStorage();
            if (environment.emulator) {
              connectStorageEmulator(storage, 'localhost', 9199);
            }
            return storage;
          }),
          provideFunctions(() => {
            const functions = getFunctions();
            if (environment.emulator) {
              connectFunctionsEmulator(functions, 'localhost', 5000);
            }
            return functions;
          }),],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule {}
