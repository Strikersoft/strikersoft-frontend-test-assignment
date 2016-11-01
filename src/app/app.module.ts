import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AnimalsService } from './services/animals-service.service';

import { AppComponent } from './containers/app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AnimalsListComponent } from './components/animals-list/animals-list.component';
import { AnimalPreviewComponent } from './components/animal-preview/animal-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    AnimalsListComponent,
    AnimalPreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AnimalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
