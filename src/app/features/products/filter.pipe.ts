import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: any[], filters: string, columns: string[]) {
    const keys = columns;

    const filterUser = user => keys.some(key => user[key].toLowerCase().includes(filters));

    return keys.length ? list?.filter(filterUser) : list;
  }

}