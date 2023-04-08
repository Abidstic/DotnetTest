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
 
  currentUser:any;
  
  

  constructor(public accountService:AccountService) {}

  ngOnInit(): void {
    
    this.accountService.currentUser$.subscribe((user: User | null) => {
      if(user)
      {
        this.currentUser = user;
      } 
    });
    
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
    this.currentUser=null;
  }


}
