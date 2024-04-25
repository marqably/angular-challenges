import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PurePipe } from './pure.pipe';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | pure: index }}
    </div>
  `,
  imports: [NgFor, PurePipe],
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
