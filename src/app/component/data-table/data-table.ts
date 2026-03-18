import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SelectionService } from '../../services/selection';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-data-table',
  standalone: true,
   imports: [CommonModule],
  templateUrl: './data-table.html',
  styleUrls: ['./data-table.css']
})
export class DataTableComponent implements OnChanges {

  @Input() data: Record<string, any>[] = [];

  selectedRow: any;
  keys: string[] = [];

  constructor(private selection: SelectionService) {
    this.selection.selected.subscribe(r => {
      this.selectedRow = r;
    });
  }

  // 👇 Compute keys once when data changes
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data && this.data.length > 0) {
      this.keys = Object.keys(this.data[0]);
    }
  }

  selectRow(row: any) {
    this.selection.select(row);
  }

}