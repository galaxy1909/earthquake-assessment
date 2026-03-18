// services/selection.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SelectionService {

  selected = new BehaviorSubject<any>(null);

  select(row: any) {
    this.selected.next(row);
  }
}