import { Component, OnInit } from '@angular/core';
import { Establishment } from './establishment.model';
import { EstablishmentService } from './establishment.service';

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  styleUrls: ['./establishments.component.sass'],
  providers: [EstablishmentService]
})
export class EstablishmentsComponent implements OnInit {
  public establishments: Establishment[];
  constructor( private establishmentService: EstablishmentService) { }

  public ngOnInit() {
    this.establishments = this.establishmentService.getEstablishments();
    if (!this.establishments.length) {
      this.establishmentService.loadEstablishments().subscribe((establishments: Establishment[]) => {
        this.establishments = establishments;
      });
    }
  }
}
