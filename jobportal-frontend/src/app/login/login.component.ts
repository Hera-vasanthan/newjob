import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgToastService} from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm !: FormGroup;

  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder,
    private httpClient: HttpClient, private router: Router, private toast: NgToastService ) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required],

    })
}
login() {
  // Check if the entered username and password match admin credentials
  if (this.loginForm.value.username === 'admin' && this.loginForm.value.password === 'password') {
    // Navigate admin to 'jobs' page
    this.router.navigate(['jobs']);
  } else {
    // If not admin, perform database authentication
    this.httpClient.post<any>('http://localhost:8080/api/login', {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(res => {
      if (res.success) {
        // Authentication successful, navigate to 'applyjobs' page
        this.router.navigate(['applyjobs']);
      } else {
        // Authentication failed, display error message
        this.toast.error({ detail: 'Error!', summary: 'Login Failed! User Not Found', duration: 4000 });
      }
    }, error => {
      // Handle HTTP request error
      this.toast.warning({ detail: 'Warning!', summary: 'Something Went Wrong!!', duration: 5000 });
    });
  }
}






ngAfterViewInit() {
  this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = 'lightblue';
}
}
