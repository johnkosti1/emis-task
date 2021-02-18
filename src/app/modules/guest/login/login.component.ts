import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/shared/services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public message: string;
  constructor(
    // private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.initForm();
  }

  ngOnInit() {}

  public login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login({
        userName: this.loginForm.get('userName').value,
        password: this.loginForm.get('password').value,
      })
      .subscribe(
        (res: any) => {
          // this.router.navigate(['/guest/startup']);
          localStorage.setItem('token', res.token);
        },
        (err: any) => {
          if (err.status === 400) {
            this.message = 'არასწორი მომხმარებლის სახელი ან პაროლი';
          }
        }
      );
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      userName: this.fb.control('admin@cheishvili.ge', Validators.required),
      password: this.fb.control('dsdgm31990', Validators.required),
    });
  }
}
