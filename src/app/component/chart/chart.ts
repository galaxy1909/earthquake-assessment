// components/chart-panel/chart-panel.component.ts
import { Component, Input, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SelectionService } from '../../services/selection';

@Component({
  selector: 'app-chart-panel',
  standalone: true,
  templateUrl: './chart.html',
  styleUrls: ['./chart.css']
})
export class ChartPanelComponent implements OnInit {

  @Input() data: any[] = [];

  constructor(
    private el: ElementRef,
    private selection: SelectionService
  ) {}

  ngOnInit() {
    this.createChart();

    this.selection.selected.subscribe(row => {
      d3.selectAll("circle")
        .attr("fill", "steelblue")
        .attr("r", 4);

      if (row) {
        d3.select(`#point-${row.id}`)
          .attr("fill", "orange")
          .attr("r", 8);
      }
    });
  }

  createChart() {

    const svg = d3.select(this.el.nativeElement)
      .select('#chart')
      .append('svg')
      .attr('width', 500)
      .attr('height', 400);

    const x = d3.scaleLinear().domain([0, 10]).range([40, 480]);
    const y = d3.scaleLinear().domain([0, 700]).range([380, 20]);

    svg.selectAll("circle")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("id", d => "point-" + d.id)
      .attr("cx", d => x(d.mag))
      .attr("cy", d => y(d.depth))
      .attr("r", 4)
      .attr("fill", "steelblue")
      .on("click", (event, d) => {
        this.selection.select(d);
      });
  }
}