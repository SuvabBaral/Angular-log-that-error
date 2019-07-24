import { Component, Input, ComponentFactoryResolver } from "@angular/core";
import { LoginService } from "./login.service";
import { Users } from "./users";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { ErrorHandlerService } from 'log-that-error';



@Component({
    templateUrl :'./login.component.html',
    styleUrls : ['./login.component.css']
})

export class LoginComponent{
    userName : string;
    name : string;
    Password :string;
    users :Users[]=[];
    
    index : number;
    alertMessage :string;
    constructor(private loginService : LoginService , private router : Router,private userService:UserService , private errorHandlerService : ErrorHandlerService){
        if(userService.isLoggedIn())
            router.navigate(['/dash']);
        errorHandlerService.setUrl("http://localhost:3400/Errors")
        
           
    }
    validate() : void{
        this.index=this.users.findIndex(obj => obj.username === this.userName);
        if(this.index === -1){
            this.alertMessage="Please enter a valid username.";
        }
        else if(this.users[this.index].password === this.Password){
            this.name=this.users[this.index].name;
            this.loginService.setName(this.users[this.index].name);
            this.loginService.setNumber(this.users[this.index].number);
            this.loginService.setEmail(this.users[this.index].username);
            sessionStorage.setItem('username' , this.userName);
            this.router.navigate(['/dash']);
        }
        else{
            this.alertMessage="Please enter the correct password";
        }
        
       
    }

    ngOnInit():void{
        this.loginService.getUsers().subscribe(
            users => {
                this.users=users
                
            }
        );
    
    
            /* 
        //Subscribe to the errorEvent raised.
        */
       this.errorHandlerService.notify.subscribe((result) => {
        /*
          //In order to notify to the Server/Admin , anyone can subscribe and push the error to the server.
        */
          this.errorHandlerService.enterInDB(result.errorDetail);
        }); 
  
         
    
      

          
       

                 
     }

      getUserName():string{
        
         return this.userName;
     }
     getName():string{
         return this.name;
     }
}
