// services/earthquake.service.ts
import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Earthquake } from '../models/earthquake.model';

@Injectable({ providedIn: 'root' })
export class EarthquakeService {

  url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv";

  async loadEarthquakes(): Promise<Earthquake[]> {
    const data = await d3.csv(this.url);

    return data.map((d: any) => ({
      id: d.id,
      time: d.time,
      place: d.place,
      mag: +d.mag,
      depth: +d.depth,
      latitude: +d.latitude,
      longitude: +d.longitude
    }));
  }
}