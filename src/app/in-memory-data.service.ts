import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Villano } from './villano';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice',poderes:'Invisibilidad' },
      { id: 13, name: 'Bombasto',poderes:'Invisibilidad' },
      { id: 14, name: 'Celeritas',poderes:'Invisibilidad' },
      { id: 15, name: 'Magneta',poderes:'Invisibilidad' },
      { id: 16, name: 'RubberMan',poderes:'Invisibilidad' },
      { id: 17, name: 'Dynama',poderes:'Invisibilidad' },
      { id: 18, name: 'Dr. IQ',poderes:'Invisibilidad' },
      { id: 19, name: 'Magma',poderes:'Invisibilidad' },
      { id: 20, name: 'Tornado',poderes:'Invisibilidad' }
    ];
    return {heroes};
  }

  createDb2() {
    const villanos = [
      { id: 12, name: 'Dr. Nice',poderes:'Invisibilidad' },
      { id: 13, name: 'Bombasto',poderes:'Invisibilidad' },
      { id: 14, name: 'Celeritas',poderes:'Invisibilidad' },
      { id: 15, name: 'Magneta',poderes:'Invisibilidad' },
      { id: 16, name: 'RubberMan',poderes:'Invisibilidad' },
      { id: 17, name: 'Dynama',poderes:'Invisibilidad' },
      { id: 18, name: 'Dr. IQ',poderes:'Invisibilidad' },
      { id: 19, name: 'Magma',poderes:'Invisibilidad' },
      { id: 20, name: 'Tornado',poderes:'Invisibilidad' }
    ];
    return {villanos};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
  genId2(villanos: Villano[]): number {
    return villanos.length > 0 ? Math.max(...villanos.map(villanos => villanos.id)) + 1 : 11;
  }
}