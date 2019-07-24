import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SavedComponent } from './Saved/saved.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { DashComponent } from './Dash/dash.component';
import { LoginComponent } from './Login/login.component';
import { OnlyLoggedInUsersService } from './authenticated-user.service';
import { AuthGuardService } from './auth-guard.service';
// import { RegisterComponent } from './Register/register.component';

const routes: Routes = [{
  path : 'saved' , component : SavedComponent , canActivate : [OnlyLoggedInUsersService , AuthGuardService]},
    { path :'' , redirectTo :'login' , pathMatch:'full'},
    {path :'dashboard' ,component : DashboardComponent, canActivate : [OnlyLoggedInUsersService , AuthGuardService]},
  {path : 'login' , component : LoginComponent},
  // {path : 'register' , component :RegisterComponent},
  { path: 'dash' , component : DashComponent , canActivate : [OnlyLoggedInUsersService , AuthGuardService],
    children : [
     
    
       {
        path : '' , redirectTo :'dash' , pathMatch :'full'
      },
    ]
}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
