import { HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest, 
    HttpErrorResponse,
    HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable, Injector, Output } from '@angular/core';
import { formatDate } from '@angular/common';
// import { version, name } from 'package.json';

import { Router} from '@angular/router';
import { ErrorHandlerService} from './error-handler.service'



@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
  
  // appVersion: string = version;
  // appName : string = name;

  constructor(private injector: Injector , private http: HttpClient, private router : Router , private ErrorHandlerService :ErrorHandlerService ) {
   }

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
   return next.handle(request)
     .pipe(
       catchError((error: HttpErrorResponse) => {
        //  const rollbar = this.injector.get(RollbarService);
        let errorMessage = '';
        
         if (error.error instanceof ErrorEvent) {
           errorMessage = 'Error:'+ error.error.message;
         } else {
           
           errorMessage = "Error Code: "+error.status+"\nMessage: "+error.message + "\n Status:"+error.statusText+"\nTimestamp :"+formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
         }  
        //  rollbar.error(errorMessage);

        /*

         Raising an Error Event if HTTP ERROR Occurs
        
         */
        var temp = document.createElement("div");
        var att= document.createAttribute("class");
        att.value="alert alert-danger alert-dismissible fixed-top";
        temp.setAttributeNode(att);
        temp.appendChild(document.createTextNode('Sorry! A ERROR OCCURED. Please contact you service provider.'));
        document.body.appendChild(temp);
        this.ErrorHandlerService.onNotify(errorMessage , error);
        console.log('An error Occured :\n'+errorMessage +'\n\nSubscribe to the errorEvent , set the URL for your REST API using setURL() method and Call the enterInDB() method to notify the Server/Admin')
         return throwError(errorMessage);
       })
     )
 }
}
