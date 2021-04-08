import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router"
import { DataService } from '../services/data.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginControl: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private service: DataService) { }

  ngOnInit(): void {
    this.loginControl = this.fb.group({
      email: '', 
      password: '', 
    })
  }

  loginUser(){
    this.service.login(this.loginControl.get('email').value, this.loginControl.get('password').value)
    this.router.navigate(['/expense']);
    
  }
}
