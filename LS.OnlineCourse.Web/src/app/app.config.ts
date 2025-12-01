import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpRequestInterceptor } from './services/spinner-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import {
  MsalInterceptor,
  MSAL_INSTANCE,
  MsalInterceptorConfiguration,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
  ProtectedResourceScopes,
} from '@azure/msal-angular';

import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel,
} from '@azure/msal-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      CarouselModule.forRoot(),
      BrowserModule,
      BrowserAnimationsModule,
      NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'}),
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      })
    ),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ]
};

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export const b2cPolicies = {
  names: {
    signUpSignIn: 'susi'
  },
  authorities: {
    signUpSignIn: {
      authority:
        'https://login.microsoftonline.com/myonlinecourse.onmicrosoft.com',
    }
  },
  authorityDomain: 'myonlinecourse.ciamlogin.com',
};

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.adb2cConfig.clientId,
      authority: b2cPolicies.authorities.signUpSignIn.authority, //environment.msalConfig.auth.authority,
      redirectUri: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<
    string,
    //Array<string>
    Array<string | ProtectedResourceScopes> | null
  >();
  //have this set if more microservice used or requires different scope for different controllers
  protectedResourceMap.set(
    environment.adb2cConfig.apiEndpointUrl, // This is for all controllers
    environment.adb2cConfig.scopeUrls
  );

  protectedResourceMap.set(environment.adb2cConfig.apiEndpointUrl, [
    {
      httpMethod: 'GET',
      scopes: [...environment.adb2cConfig.scopeUrls]
    },
    {
      httpMethod: 'POST',
      scopes: [...environment.adb2cConfig.scopeUrls],
    },
    {
      httpMethod: 'PUT',
      scopes: [...environment.adb2cConfig.scopeUrls],
    },
    {
      httpMethod: 'DELETE',
      scopes: [...environment.adb2cConfig.scopeUrls],
    },
    {
      httpMethod: 'PATCH',
      scopes: [...environment.adb2cConfig.scopeUrls],
    },
  ]);

  // protectedResourceMap.set(
  //   `${environment.adb2cConfig.apiEndpointUrl}/videorequest`,
  //   [
  //     {
  //       httpMethod: 'GET',
  //       scopes: [...environment.adb2cConfig.scopeUrls],
  //     },
  //     {
  //       httpMethod: 'POST',
  //       scopes: [...environment.adb2cConfig.scopeUrls],
  //     },
  //     {
  //       httpMethod: 'PUT',
  //       scopes: [...environment.adb2cConfig.scopeUrls],
  //     },
  //     {
  //       httpMethod: 'DELETE',
  //       scopes: [...environment.adb2cConfig.scopeUrls],
  //     },
  //     {
  //       httpMethod: 'PATCH',
  //       scopes: [...environment.adb2cConfig.scopeUrls],
  //     },
  //   ]
  // );

  // protectedResourceMap.set(
  //   `${environment.adb2cConfig.apiEndpointUrl}/enrollment`,
  //   [
  //     {
  //       httpMethod: 'GET',
  //       scopes: [...environment.adb2cConfig.scopeUrls],
  //     },
  //     {
  //       httpMethod: 'POST',
  //       scopes: [...environment.adb2cConfig.scopeUrls],
  //     },
  //     {
  //       httpMethod: 'PUT',
  //       scopes: [...environment.adb2cConfig.scopeUrls],
  //     },
  //     {
  //       httpMethod: 'DELETE',
  //       scopes: [...environment.adb2cConfig.scopeUrls],
  //     },
  //     {
  //       httpMethod: 'PATCH',
  //       scopes: [...environment.adb2cConfig.scopeUrls],
  //     },
  //   ]
  // );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.adb2cConfig.scopeUrls],
    },
    loginFailedRoute: '/login-failed',
  };
}

