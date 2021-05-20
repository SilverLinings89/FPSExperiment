import { Component } from '@angular/core';
import { Simulation } from './simulation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fpsexperiment';
  simulation : Simulation;

  constructor() {
    this.simulation = new Simulation(50);
  }

  run() {
    this.simulation.run();
  }
}
