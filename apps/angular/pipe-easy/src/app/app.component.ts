import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ConcatWithHyphenPipe } from './concat-with-hyphen.pipe';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | concatHyphen: index }}
    </div>
  `,
  imports: [NgFor, ConcatWithHyphenPipe],
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
