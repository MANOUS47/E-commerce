import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(proOfObject: any[], term: string): any[] {
    return proOfObject.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
