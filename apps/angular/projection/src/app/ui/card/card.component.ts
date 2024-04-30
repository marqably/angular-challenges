import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  randStudent,
  randTeacher,
  randomCity,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content></ng-content>

      <section>
        <ng-container *ngFor="let data of list">
          <ng-container
            *ngTemplateOutlet="
              cardTemplateRef;
              context: { data: data }
            "></ng-container>
        </ng-container>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class CardComponent {
  @Input() list!: any[];
  @Input() type!: CardType;
  @Input() customClass = '';
  @Input() cardTemplateRef!: TemplateRef<any>;

  CardType = CardType;

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
    private cityStore: CityStore,
  ) {}

  addNewItem() {
    switch (this.type) {
      case CardType.TEACHER:
        this.teacherStore.addOne(randTeacher());
        break;
      case CardType.STUDENT:
        this.studentStore.addOne(randStudent());
        break;
      case CardType.CITY:
        this.cityStore.addOne(randomCity());
        break;
    }
  }
}
