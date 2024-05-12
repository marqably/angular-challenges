import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concatHyphen',
  standalone: true,
  pure: true,
})
export class ConcatWithHyphenPipe implements PipeTransform {
  transform(value1: PipeInput, value2: PipeInput): string {
    return `${value1} - ${value2}`;
  }
}

export type PipeInput = string | number;
