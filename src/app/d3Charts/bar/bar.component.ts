import { Component, OnInit } from '@angular/core';
// import * as d3 from "d3";
declare var d3: any;

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.less']
})
export class BarComponent implements OnInit {

  width = 960;
  height = 500;
   svg;
   link;
   node;
   force; 
   drag;

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
    // this.drag = this.force.drag()
    // .on("dragstart", this.dragstart);
    // this.svg = d3.select("figure#bar").append("svg")
    // .attr("width", this.width)
    // .attr("height", this.height);
    // this.link = this.svg.selectAll(".link");
    // this.node = this.svg.selectAll(".node");
    this.force = d3.layout.force()
    .size([this.width, this.height])
    .charge(-400)
    .linkDistance(40)
    .on("tick", this.tick);
    this.drag = this.force.drag()
    .on("dragstart", this.dragstart);
    this.svg = d3.select("body").append("svg")
    .attr("width", this.width)
    .attr("height", this.height);
    this.link = this.svg.selectAll(".link");
    this.node = this.svg.selectAll(".node");
    d3.json("assets/graph.json", function(error, graph) {
      if (error) throw error;
    
      this.force
          .nodes(graph.nodes)
          .links(graph.links)
          .start();
    
      this.link = this.link.data(graph.links)
        .enter().append("line")
          .attr("class", "link");
    
      this.node = this.node.data(graph.nodes)
        .enter().append("circle")
          .attr("class", "node")
          .attr("r", 12)
          .on("dblclick", this.dblclick)
          .call(this.drag);
    });
}


  tick() {
  this.link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  this.node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

 dblclick(d) {
  d3.select("body").classed("fixed", d.fixed = false);
}

dragstart(d) {
  d3.select("body").classed("fixed", d.fixed = true);
}

}
