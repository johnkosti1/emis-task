import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './modules/guest/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { CompaniesModule } from './modules/member/companies/companies.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    SharedModule,
    HttpClientModule,
    CompaniesModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
