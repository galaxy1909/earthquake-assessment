import { Component, OnInit } from '@angular/core';
import { ChartPanelComponent } from './component/chart/chart';
import { DataTableComponent } from './component/data-table/data-table';
import { CommonModule } from '@angular/common';
import { EarthquakeService } from './services/earthquake';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,ChartPanelComponent, DataTableComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  earthquakes: any[] = [];
  loading = true;

  constructor(private eqService: EarthquakeService) {}

  async ngOnInit() {
    this.earthquakes = await this.eqService.loadEarthquakes();
    this.loading = false;
  }
}