import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concatHyphen',
  standalone: true,
})
export class ConcatWithHyphenPipe implements PipeTransform {
  transform(value1: unknown, value2: unknown): string {
    return `${value1} - ${value2}`;
  }
}
