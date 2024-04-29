import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <ng-template #cardList let-data="data">
      <app-list-item
        [name]="data.name"
        [id]="data.id"
        [type]="cardType"></app-list-item>
    </ng-template>
    <app-card
      [list]="cities"
      [cardTemplateRef]="cardList"
      customClass="bg-light-green">
      <img src="assets/img/city.png" width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, CommonModule],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  @ViewChild('cardList', { static: true }) cardList!: TemplateRef<any>;

  cardType = CardType.CITY;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
    this.store.cities$.subscribe((c) => (this.cities = c));
  }
}
