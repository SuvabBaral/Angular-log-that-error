import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { Users } from "./users";
@Injectable({
    providedIn : 'root'
})

export class LoginService{
    private userUrl="http://localhost:3000/Users";
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    constructor(private http : HttpClient){    }
   error:any;
   email : string;
   name:string;
   number : number;

   getUsers( ) : Observable<Users []>{
 
       return this.http.get<Users[]>(this.userUrl).pipe(
            error => this.error =error
       );
    }
    setName(name:string){
        this.name=name;
    }
    setEmail(email :string){
        this.email=email;
    }
    setNumber(number :number){
        this.number =number;
    }
    getEmail():string{
        return this.email;
    }
    getNumber() : number{
        return this.number;
    }

    getName(): string {
        return this.name;
    }

   

  
}
