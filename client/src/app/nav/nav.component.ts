import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any={};
  myObjectString:string |null= localStorage.getItem('user');
  myObject:any;
  
  

  constructor(public accountService:AccountService) {}

  ngOnInit(): void {
    if(this.myObjectString){
      this.myObject=JSON.parse(this.myObjectString);
    }
    
  }
 
  login()
  {
    this.accountService.login(this.model).subscribe({
      next:response=>{
        console.log(response);
      },
      error:error => console.log(error)
    })
  }
  logout(){
    this.accountService.logout();
    this.myObject=null;
  }


}
