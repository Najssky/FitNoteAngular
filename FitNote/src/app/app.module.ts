import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { TrainingInfoComponent } from './components/training-info/training-info.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { NgBootstrapModule } from './modules/ng-bootstrap.module';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';
import { HomeComponent } from './views/home/home.component';
import { UnloggedHomeComponent } from './views/unlogged-home/unlogged-home.component';
export function tokenGetter() {
  const token = localStorage.getItem('access_token');
  return token;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UnloggedHomeComponent,
    HomeComponent,
    CalendarComponent,
    NavbarComponent,
    TrainingInfoComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    FullCalendarModule,
    NgBootstrapModule,
    FlexLayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['example.com'], // Replace with your server domain
        disallowedRoutes: ['example.com/auth/'], // Replace with your server's auth routes
      },
    }),
  ],
  providers: [AuthService, TokenStorageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
