import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.less']
})
export class BarComponent implements OnInit {

  width = 960;
  height = 500;
  private svg;
  private link;
  private node;
  private force; 
  private drag;

  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];

  // private margin = 50;
  // private width = 750 - (this.margin * 2);
  // private height = 400 - (this.margin * 2);

  constructor() { }

  ngOnInit(): void {
     this.createSvg();
    // this.drawBars(this.data);
  }

  private createSvg(): void {
    this.drag = this.force.drag()
    .on("dragstart", this.dragstart);
    this.svg = d3.select("figure#bar").append("svg")
    .attr("width", this.width)
    .attr("height", this.height);
    this.link = this.svg.selectAll(".link");
    this.node = this.svg.selectAll(".node");
}

private drawBars(data: any[]): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.Framework))
  .padding(0.2);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 200000])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .call(d3.axisLeft(y));

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(d.Framework))
  .attr("y", d => y(d.Stars))
  .attr("width", x.bandwidth())
  .attr("height", (d) => this.height - y(d.Stars))
  .attr("fill", "#d04a35");
}


  tick() {
  this.link.attr("x1", function(d:any) { return d.source.x; })
      .attr("y1", function(d:any) { return d.source.y; })
      .attr("x2", function(d:any) { return d.target.x; })
      .attr("y2", function(d:any) { return d.target.y; });

  this.node.attr("cx", function(d:any) { return d.x; })
      .attr("cy", function(d:any) { return d.y; });
}

 dblclick(d) {
  d3.select("figure#bar").classed("fixed", d.fixed = false);
}

dragstart(d) {
  d3.select("figure#bar").classed("fixed", d.fixed = true);
}

}
