import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pure',
  standalone: true,
})
export class PurePipe implements PipeTransform {
  transform(value1: unknown, value2: unknown): unknown {
    return `${value1} - ${value2}`;
  }
}
