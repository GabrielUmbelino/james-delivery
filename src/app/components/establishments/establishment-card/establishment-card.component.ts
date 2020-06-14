import { Component, Input } from '@angular/core';
import { Establishment } from '../establishment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-establishment-card',
  templateUrl: './establishment-card.component.html',
  styleUrls: ['./establishment-card.component.sass']
})
export class EstablishmentCardComponent {
  @Input() establishment: Establishment;
  constructor(private router: Router) { }
  get address(): { city?: string, street?: string, houseNumber?: string} {
    if (!this.establishment || !this.establishment.address) {
      return {};
    }

    const [street, state, city, houseNumber] = this.establishment.address.split(',');
    return {
      city,
      street,
      houseNumber
    };
  }

  onTapEstablishment(establishmentId: string): void {
    this.router.navigate(['/establishment', establishmentId]);
  }

}
