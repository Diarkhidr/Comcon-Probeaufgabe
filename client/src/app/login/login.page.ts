import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    url: new FormControl(localStorage.getItem('url') || '', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    stayLoggedIn: new FormControl(false),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }

  async onSubmit() {
    if(this.loginForm.valid) {
      if(await this.authService.Login(this.loginForm.value)) {
        this.router.navigate(['/main']);
      }

    }
  }

}
