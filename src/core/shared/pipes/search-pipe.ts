import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchTerm: string, searchFields: string[] = ['title']): any[] {
    if (!items || items.length === 0) {
      return [];
    }

    if (!searchTerm || searchTerm.trim() === '') {
      return items;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    return items.filter(item => {
      return searchFields.some(field => {
        const fieldValue = item[field];
        return fieldValue && fieldValue.toString().toLowerCase().includes(lowerCaseSearchTerm);
      } );
    }); 
  }

}
