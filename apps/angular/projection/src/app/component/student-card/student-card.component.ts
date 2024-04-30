import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <ng-template #cardList let-data="data">
      <app-list-item
        [name]="data.firstName"
        [id]="data.id"
        [type]="cardType"></app-list-item>
    </ng-template>
    <app-card
      [list]="students"
      [type]="cardType"
      [cardTemplateRef]="cardList"
      customClass="bg-light-green">
      <img src="assets/img/student.webp" width="200px" />
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, CommonModule],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;

  @ViewChild('cardList', { static: true }) cardList!: TemplateRef<any>;
  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }
}
