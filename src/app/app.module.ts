import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  enableProdMode,
  Injectable,
  ErrorHandler,

} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseErrorInterceptor } from './core/interceptors/response-error.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { LayoutModule } from './ui/layout/layout.module';
import { AuthModalModule } from './ui/auth-modal/auth-modal.module';
import { DocumentsPageModule } from './pages/documents-page/documents-page.module';
import { PreloaderModule } from './ui/preloader/preloader.module';
import { NotificationsComponent } from './ui/notifications/notifications.component';
import { MessengerModule } from './ui/messenger/messenger.module';

import * as Sentry from '@sentry/browser';
import { environmentSentry } from '../environments/enviroment.sentry';
import { EsiaLoginComponent } from './pages/esia-login/esia-login.component';
import { SwaggerModule } from './pages/swagger/swagger.module';

registerLocaleData(localeRu);
enableProdMode();



Sentry.init({
  beforeSend(event) {
    return event.environment === 'production' ? event : null;
  },
  dsn:
    'https://1aee38efeafb405c9d340d2d60d9778b@o394490.ingest.sentry.io/5244644',
  environment: `${environmentSentry.environment}`,
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  handleError(error) {
    Sentry.captureException(error.originalError || error);
  }
}

@NgModule({
  declarations: [AppComponent, NotificationsComponent, EsiaLoginComponent],
  imports: [
    NgxMaskModule.forRoot(),
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ScrollToModule.forRoot(),
    LayoutModule,
    AuthModalModule,
    DocumentsPageModule,
    PreloaderModule,
    SwaggerModule,
    MessengerModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseErrorInterceptor,
      // provide: ErrorHandler,
      // useClass: SentryErrorHandler,
      multi: true, // false is Sentry On
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
