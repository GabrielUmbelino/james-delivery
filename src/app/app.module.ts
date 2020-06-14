import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EstablishmentCardComponent } from './components/establishments/establishment-card/establishment-card.component';
import { EstablishmentsComponent } from './components/establishments/establishments.component';
import { EstablishmentDetailsComponent } from './components/establishment-details/establishment-details.component';
import { EstablishmentService } from './components/establishments/establishment.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, optionsConfig } from 'ngx-mask-2';
import { LocalStorageService } from './components/establishments/local-storage.service';
import { MessageComponent } from './components/message/message.component';


const maskConfig: optionsConfig = {};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EstablishmentCardComponent,
    EstablishmentsComponent,
    EstablishmentDetailsComponent,
    MessageComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [EstablishmentService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
