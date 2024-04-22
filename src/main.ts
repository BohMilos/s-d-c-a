import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
  <p style=font-weight:900;> Work In Progress
  </p>
  `,
})
export class App {
  name = 'Sui';
}

bootstrapApplication(App);
