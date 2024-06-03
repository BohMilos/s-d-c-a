import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login.component';
import { HomePageComponent } from '../components/home-page/home-page.component'; // Import the home page component

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent }, // Define route for home page
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login page by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
