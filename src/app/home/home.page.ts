import { Component } from '@angular/core';
import { Address } from '../interfaces/address';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedAddress: Address = {
    addressLine1: 'Feld 8',
    city: 'Stansstad',
    state: 'NW',
    zipCode: '6362',
    latitude: '46.9742113',
    longitude: '8.3398162',
  };

  constructor() { }

};
