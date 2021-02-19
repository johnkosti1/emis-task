import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../modules/core/services/auth.service';
import {catchError, tap} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    userName: this.formBuilder.control('admin@cheishvili.ge', Validators.required),
    password: this.formBuilder.control('dsdgm31990', Validators.required),
  });

  message: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.checkLogin();
  }

  handleError = (err) => {
    if (err.status === 400) {
      this.message = 'არასწორი მომხმარებლის სახელი ან პაროლი';
    }
    return err
  }

  checkLogin() {
    this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      if(isLoggedIn){
        this.router.navigate(['/institutions']);
      }
    });
  }

  login(): void {
    if (this.form.invalid) return;

    this.authService
      .login(this.form.value)
      .pipe(
        tap(({ token }) => localStorage.setItem('token', token)),
        tap(() => this.router.navigate(['/institutions'])),
        catchError(this.handleError)
      )
      .subscribe();
  }
}
