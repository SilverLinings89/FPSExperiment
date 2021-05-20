import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ControlComponent } from './control/control.component';
import { WorldComponent } from './world/world.component';
import { MultipleWorldsComponent } from './multiple-worlds/multiple-worlds.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlComponent,
    WorldComponent,
    MultipleWorldsComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
