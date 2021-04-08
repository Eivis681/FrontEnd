import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  get logedIn(): boolean{
    return this.service.logedIn
  }

  get userEmail(): string {
    return this.service.userEmail
  }

  constructor(private service: DataService) {
            
  }

  ngOnInit(): void {
  
  }

  logOut(){
    this.service.logout()
  }

}
  // this.service.logedIn.subscribe(data=>{
    //   this.logedIn = data
    // })
    // this.service.userEmail.subscribe(data=>{
    //   this.userEmail = data
    // })
    // this.logedIn = this.service.logedIn
    // this.userEmail = this.service.userEmail
      // set userEmail(userName: string ){
  //   this.userEmail = userName
  //   this.logedIn = true
  // }