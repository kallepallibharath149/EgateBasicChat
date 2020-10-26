import { AfterViewInit, Component,OnChanges, OnInit,ViewEncapsulation, AfterViewChecked,ElementRef, ViewChild, Input} from '@angular/core';
//  import * as d3 from "d3";
 import { test } from './miserables';
declare var d3: any;

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BarComponent implements OnInit,AfterViewChecked {

  graph = {
    "nodes": [
      {"x": 469, "y": 410},
      {"x": 493, "y": 364},
      {"x": 442, "y": 365},
      {"x": 467, "y": 314},
      {"x": 477, "y": 248},
      {"x": 425, "y": 207},
      {"x": 402, "y": 155},
      {"x": 369, "y": 196},
      {"x": 350, "y": 148},
      {"x": 539, "y": 222},
      {"x": 594, "y": 235},
      {"x": 582, "y": 185},
      {"x": 633, "y": 200}
    ],
    "links": [
      {"source":  0, "target":  1},
      {"source":  1, "target":  2},
      {"source":  2, "target":  0},
      {"source":  1, "target":  3},
      {"source":  3, "target":  2},
      {"source":  3, "target":  4},
      {"source":  4, "target":  5},
      {"source":  5, "target":  6},
      {"source":  5, "target":  7},
      {"source":  6, "target":  7},
      {"source":  6, "target":  8},
      {"source":  7, "target":  8},
      {"source":  9, "target":  4},
      {"source":  9, "target": 11},
      {"source":  9, "target": 10},
      {"source": 10, "target": 11},
      {"source": 11, "target": 12},
      {"source": 12, "target": 10}
    ]
  }
  simulation: any;
width = 900;
 height = 500;
force:any;
drag :any;
svg:any;
link:any;
node:any;
ngOnInit(){
  this.runSimulation();
}
ngAfterViewChecked(){

}

runcode(){
  this.force
      .nodes(this.graph.nodes)
      .links(this.graph.links)
      .start();

  this.link = this.link.data(this.graph.links)
    .enter().append("line")
      .attr("class", "link");

  this.node = this.node.data(this.graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 12)
      .on("dblclick", this.dblclick)
      .call(this.drag);
}
  runSimulation = () => {
    this.force = d3.layout.force()
    .size([this.width, this.height])
    .charge(-400)
    .linkDistance(40)
    .on("tick",  ()=>{return this.tick()});
    this.drag = this.force.drag()
    .on("dragstart", (d) => {return this.dragstart(d);});
    this.svg = d3.select("#force").append("svg")
    .attr("width", this.width)
    .attr("height", this.height);
    this.link = this.svg.selectAll(".link");
     this.node = this.svg.selectAll(".node");
     this.runcode();
  }

  tick() {
    this.link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
  
    this.node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  dragstart = (d) => {
    d3.select(d3.event.currentTarget).classed("fixed", d.fixed = true);
}

dblclick = (d)=> {
  d3.select(d3.event.currentTarget).classed("fixed", d.fixed = false);
}

}

