# Log-That-Error

<h3> NPM Repository Link : </h3> <a href="https://www.npmjs.com/package/log-that-error">https://www.npmjs.com/package/log-that-error</a><br><br>

This is basically an angular library.
It raises an event whenever an error occurs and this event can be subscribed to by anyone and can handle the error themselves or can notify the 
admin about the error by logging it to a REST API.<br><br>
The REST API URL must be set using the setURL() method of the ErrorHandlerService class.
Logging can be done by just calling the enterInDB( error : any ) method of the same class and passing the error details.<br><br>

Example : 

  `
   /* 

    For setting the REST API URL 

    */ 

     this.errorHandlerService.setUrl("YOUR URL"); 



    /* 

    For subscribing to the error event 

    */ 

    this.errorHandlerService.notify.subscribe((result) => { 

   

    /*  

    For logging the error into the server 

    */ 

      this.errorHandlerService.enterInDB(result.errorDetail); 

    });  `

To convert this into a reusable angular package , run the following Angular CLI command on the 
ROOT Directory.
`ng build log-that-error --watch`

This command will create a <i>'ROOT/dist'</i> folder which will contain the reusable angular package that was uploaded to the npm library.


