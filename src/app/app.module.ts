import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { InstitutionsModule } from './modules/institutions/companies.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShellComponent } from './components/shell/shell.component';
import {NavigationComponent} from "./components/navigation/navigation.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShellComponent,
    NavigationComponent,
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    CoreModule,
    HttpClientModule,
    InstitutionsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
