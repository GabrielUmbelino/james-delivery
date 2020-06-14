import { Injectable } from '@angular/core';
import { Establishment } from './establishment.model';

const LOCAL_STORAGE_KEY = 'establishments-local';

@Injectable()
export class LocalStorageService {

  set(establishments: Establishment[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(establishments));
  }
  get(): Establishment[] {
    const establishmentsString = localStorage.getItem(LOCAL_STORAGE_KEY);
    return JSON.parse( establishmentsString ? establishmentsString :  '[]');
  }
}
