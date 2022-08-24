import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLogInMode: boolean = true;
  isLoading: boolean = false;
  form!: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      emailForm: [null, Validators.required],
      passwordForm: [null, Validators.required],
    });
  }

  onSwitchMode() {
    this.isLogInMode = !this.isLogInMode;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;
    const body = {
      email: this.form.get('emailForm')?.value,
      password: this.form.get('passwordForm')?.value,
      returnSecureToken: true,
    };
    let authObservable: Observable<any>;

    if (this.isLogInMode) {
      authObservable = this.authService.login(body);
    } else {
      authObservable = this.authService.signup(body);
    }

    authObservable.subscribe(
      (res: any) => {
        console.log(res);
        this.form.reset();
        this.isLoading = false;
      },
      (err: any) => {
        const errorMessage = err.error.error.message;
        this.isLoading = false;
        console.log(errorMessage);
        switch (errorMessage) {
          case 'EMAIL_EXISTS':
            this.error = 'This Email is already exits!';
            break;
          case 'WEAK_PASSWORD : Password should be at least 6 characters':
            this.error = 'Password should be at least 6 characters';
            break;
          case 'EMAIL_NOT_FOUND':
            this.error = 'There is no user record corresponding to this identifier. The user may have been deleted';
            break;
          case 'INVALID_PASSWORD':
            this.error = 'The password is invalid or the user does not have a password';
            break;
        }
      }
    );
  }
}
