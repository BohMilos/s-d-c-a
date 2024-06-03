import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePageComponent } from '../components/home-page/home-page.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { LeftPanelComponent } from '../components/left-panel/left-panel.component';
import { MiddlePanelComponent } from '../components/middle-panel/middle-panel.component';
import { RightPanelComponent } from '../components/right-panel/right-panel.component';
import { LoginComponent } from '../components/login.component';

@NgModule({
  declarations: [
    HomePageComponent,
    NavbarComponent,
    LeftPanelComponent,
    MiddlePanelComponent,
    RightPanelComponent,
    LoginComponent,
    AppComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent], // Bootstrap LoginComponent
})
export class AppModule {}