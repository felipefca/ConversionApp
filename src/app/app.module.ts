import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExternalService } from './services/external.services';

import { ToastrModule } from 'ngx-toastr';
import { SelectModule } from 'ng2-select';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SelectModule,
    ToastrModule.forRoot(),
  ],
  providers: [ExternalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
