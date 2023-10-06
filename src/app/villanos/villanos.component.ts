import { Component, OnInit } from '@angular/core';
import { Villano } from '../villano';
import { VillanosService } from '../villanos.service';

@Component({
  selector: 'app-villanos',
  templateUrl: './villanos.component.html',
  styleUrls: ['./villanos.component.css']
})
export class VillanosComponent implements OnInit {
  villanos: Villano[] = [];

  constructor(private villanoService: VillanosService) { }

  ngOnInit(): void {
    this.getVillanos();
  }

  getVillanos(): void {
    this.villanoService.getVillanos()
    .subscribe(villanos => this.villanos = villanos);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.villanoService.addVillano({ name } as Villano)
      .subscribe(villano => {
        this.villanos.push(villano);
      });
  }

  delete(villano: Villano): void {
    this.villanos = this.villanos.filter(h => h !== villano);
    this.villanoService.deleteVillano(villano.id).subscribe();
  }
}
