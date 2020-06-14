import { Establishment } from './../establishments/establishment.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EstablishmentService } from '../establishments/establishment.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

interface Address {
  street: string;
  state: string;
  city: string;
  houseNumber: number;
}

@Component({
  selector: 'app-establishment-details',
  templateUrl: './establishment-details.component.html',
  styleUrls: ['./establishment-details.component.sass']
})
export class EstablishmentDetailsComponent implements OnInit {
  establishment: Establishment;
  loading: boolean;
  establishmentForm: FormGroup;
  cpfCnpjMask: '000.000.000-00' | '00.000.000/0000-00';
  message: { title?: string, message?: string, status: string, show: boolean };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private establishmentService: EstablishmentService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.establishment = this.establishmentService.getEstablishment(params.establishmentId);
      if (this.establishment) {
        this.initForm();
      } else {
        this.goBack();
      }
      this.loading = false;
    });
    this.cpfCnpjMask = '000.000.000-00';
  }

  initForm() {
    const {
      name,
      bank,
      accountType,
      cpfCnpj,
      agency,
      agencyDigit,
      account,
      accountDigit,
      automaticWithdraw
    } = this.establishment;
    this.establishmentForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      city: new FormControl(this.address.city, Validators.required),
      street: new FormControl(this.address.street, Validators.required),
      bank: new FormControl(bank, Validators.required),
      accountType: new FormControl(accountType, Validators.required),
      cpfCnpj: new FormControl(cpfCnpj, Validators.required),
      agency: new FormControl(agency, Validators.required),
      agencyDigit: new FormControl(agencyDigit, Validators.required),
      account: new FormControl(account, Validators.required),
      accountDigit: new FormControl(accountDigit, Validators.required),
      automaticWithdraw: new FormControl(automaticWithdraw, Validators.required),
    });

  }

  onSubmit() {
    this.address = {
      ...this.address,
      street: this.establishmentForm.get('street').value,
      city: this.establishmentForm.get('city').value
    };
    const {
      account,
      accountDigit,
      accountType,
      agency,
      agencyDigit,
      automaticWithdraw,
      bank,
      city,
      cpfCnpj,
    } = this.establishmentForm.value;
    this.establishmentService.putEstablishment({
      ...this.establishment,
      account,
      accountDigit,
      accountType,
      agency,
      agencyDigit,
      automaticWithdraw,
      bank,
      city,
      cpfCnpj
    });
    this.onMessageSuccess();
  }

  getInputClass(formControleName: string) {
    const field = this.establishmentForm.get(formControleName);
    if (!field.dirty) {
      return;
    }

    if (field.valid) {
      return 'is-success';
    }

    if (!field.valid) {
      return 'is-danger';
    }
  }

  get address(): Address {
    if (!this.establishment || !this.establishment.address) {
      return;
    }

    const [street, state, city, houseNumber] = this.establishment.address.split(',');
    return {
      street,
      state,
      city,
      houseNumber: parseInt(houseNumber, 10)
    };
  }

  set address(address: Address) {
    const { street, state, city, houseNumber } = address;
    this.establishment.address = [street, state, city, houseNumber].join(',');
  }

  changeCpfCnpj(event: Event) {
    const value = (event.target as HTMLInputElement).value.replace(/[^0-9]+/g, '');
    if (value.length >= 11) {
      this.cpfCnpjMask = '00.000.000/0000-00';
    } else if (value.length <= 11) {
      this.cpfCnpjMask = '000.000.000-00';
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onMessageClosed() {
    this.message = {
      title: '',
      message: '',
      status: '',
      show: false
    };
  }

  onMessageSuccess() {
    this.message = {
      title: 'Sucesso',
      message: 'Estabelecimento salvo',
      status: 'success',
      show: true
    };
  }

}
