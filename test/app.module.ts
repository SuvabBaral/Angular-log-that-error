import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, InjectionToken } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { SavedComponent } from './Saved/saved.component';
import { DashComponent } from './Dash/dash.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './Login/login.component';
import { FormsModule } from '@angular/forms';

import { HttpErrorInterceptor} from 'log-that-error';
import { AuthGuardService } from './auth-guard.service';
import { OnlyLoggedInUsersService } from './authenticated-user.service';

import { GlobalErrorHandler } from 'log-that-error';



// import { GlobalErrorHandler } from './globalErrorHandler';


// import { RegisterComponent } from './Register/register.component';

// const rollbarConfig = {
//   accessToken: '3cfd360e63094e86afa5c0aab6ce8766',
//   captureUncaught: true,
//   captureUnhandledRejections: true,
//  };

//  export function rollbarFactory() {
//   return new Rollbar(rollbarConfig)
//  }

//  export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashComponent,
    SavedComponent,
    LoginComponent
    // RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [ 
   {
     provide : HTTP_INTERCEPTORS,
     useClass : HttpErrorInterceptor,
     multi:true
   },
   {
     provide : ErrorHandler,
     useClass : GlobalErrorHandler
   },
    AuthGuardService,
    OnlyLoggedInUsersService
 
],
  bootstrap: [AppComponent]
})
export class AppModule { }
