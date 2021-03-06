import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('userNameInput', { static: true } ) userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: [null, Validators.required]
    });
    // tslint:disable-next-line:no-unused-expression
    this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    this.authService.authenticate(userName, password)
      .subscribe(
        () => {
          console.log('autenticado');
          // this.router.navigateByUrl('user/' + userName);
          this.router.navigate(['user', userName]);
        },
        err => {
          console.log(err.message);
          this.loginForm.reset();
          // tslint:disable-next-line:no-unused-expression
          this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
          alert('Invalid username or password!');
        }
      );
  }

}
