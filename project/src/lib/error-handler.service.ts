import { Injectable } from '@angular/core';
import { Subject,} from 'rxjs';
import * as extractStack from 'extract-stack';
import {
    HttpClient,
    HttpParams,
    HttpErrorResponse,
   } from '@angular/common/http';
    import { formatDate } from '@angular/common';
    import { Guid } from 'guid-typescript';
   
    
@Injectable({
    providedIn :'root'
})
export class ErrorHandlerService {
    id : Guid
    url : string;
    constructor( private http: HttpClient ){
    this.id=Guid.create()
       
}
setUrl(urls : string){
    this.url=urls;
}
getUrl(): string{
    return this.url;
}
   
    // appName : string = "";
    // appVersion : string ="";
    
   

    notify: Subject<{errorMessage :string , errorDetail: Error}> = new Subject<{errorMessage:string, errorDetail:Error}>();
    onNotify(errorMessage , errorDetail) {
           this.notify.next({ errorMessage , errorDetail});
    }

enterInDB(errors : any) : void 
 {
  
     
    if(errors instanceof HttpErrorResponse){
        // if the error is an HTTP ERROR , such as 'server not responding'

   let params=new HttpParams()
   .append('Error Specification' ,'HTTP ERROR')
   .append('Error',(JSON.stringify(errors)))
   .append('Error URL Source',errors.url)
//    .append('App Name',this.appName)
//    .append('AppVersion',this.appVersion+' ')
   .append('TimeStamp',formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530'))
   .append('Guid',this.id.toString())


  const req = this.http.post(this.getUrl(),params ).subscribe(
      res => {},
      err=> console.log("Error occured in logging the DB")        );
    }

    else if(!(errors instanceof HttpErrorResponse) && errors instanceof Error){
         // If the error is a runtime error 
    
       //Getting the funtion name where the error has occured.
   var function_name = extractStack.lines(errors)[0].split('.')[1].split(' ')[0];
    
    let prams=new HttpParams()
            
        .append('Error Specification ','RUNTIME ERROR')
        .append('Error',errors+' ')
        .append('Status',errors.name)
        .append('Function name',function_name)
        .append('GUID',this.id+'')
        // .append('App Name',this.appName)
        // .append('App Version',this.appVersion+' ')
        
        .append('TimeStamp',formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530'))
        const req=this.http.post(this.getUrl(),prams ).subscribe(
          res => { },
          err=> console.log("Error occured in logging the DB"+err) );
      }
    }
}

