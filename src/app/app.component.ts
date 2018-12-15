import { Component, OnInit, ModuleWithComponentFactories } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

import { ForecastData } from "./forecast-data";
import { ForecastService } from "./forecast.service";

import * as d3 from "d3";
import { removeDebugNodeFromIndex } from "@angular/core/src/debug/debug_node";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  weatherForm: FormGroup;
  selectedUserLocation: string;

  tempData = [];
  dates = [];
  //TODO: make the width & height responsive

  resetChart() {
    this.tempData = [];
    this.dates = [];
    d3.select("svg").remove();
  }

  drawChart() {
    let margin = {
      top: 60,
      right: 20,
      bottom: 20,
      left: 100
    };
    let svgWidth = 1000;
    let svgHeight = 400;
    let chartWidth = svgWidth - margin.left - margin.right;
    let chartHeight = svgHeight - margin.top - margin.bottom;

    let barWidthScale = d3
      .scaleLinear()
      .domain(d3.extent(this.tempData))
      .range([0, chartWidth]);

    let barHeightScale = d3
      .scaleBand()
      .domain(this.tempData)
      .paddingInner(0.2)
      .range([0, chartHeight]);

    let xAxisScale = d3
      .scaleLinear()
      .domain(d3.extent(this.tempData))
      .range([0, chartWidth]);

    let xAxisTicks = d3.axisTop(xAxisScale);

    let yAxisScale = d3
      .scaleTime()
      .domain([this.dates[0], this.dates[this.dates.length - 1]])
      .range([0, chartHeight]);

    let yAxisTicks = d3.axisLeft(yAxisScale).ticks(d3.timeHour.every(3));

    let tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("padding", "0 10px")
      .style("background-color", "black")
      .style("color", "white")
      .style("border-radius", "3px")
      .style("opacity", 0);

    let svg = d3
      .select("#forecast")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("display", "block")
      .style("margin", "auto");

    let chart = svg
      .append("g")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .selectAll("rect")
      .data(this.tempData)
      .enter()
      .append("rect")
      .attr("height", d => {
        return barHeightScale.bandwidth();
      })
      .attr("width", 0)
      .attr("fill", d => {
        if (d > 30) {
          return "#ff4d4d";
        } else {
          return "#3399ff";
        }
      })
      .attr("x", 0)
      .attr("y", d => {
        return barHeightScale(d);
      })
      .on("mouseover", d => {
        tooltip
          .html(d + " &#8451;")
          .style("left", d3.event.pageX + 35 + "px")
          .style("top", d3.event.pageY - 35 + "px")
          .style("opacity", 1);
      })
      .on("mouseout", d => {
        tooltip.style("opacity", 0);
      });

    chart
      .transition()
      .attr("width", d => {
        return barWidthScale(d);
      })
      .duration(1000)
      .delay((d, i) => {
        return i * 20;
      })
      .ease(d3.easeBounce);

    let xAxis = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(xAxisTicks)
      .selectAll("g.tick text")
      .style("font-size", "12px");

    let yAxis = svg
      .append("g")
      .attr("class", "yAxis")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(yAxisTicks)
      .selectAll("g.tick text")
      .style("font-size", "12px");

    let xAxisLabel = svg
      .append("text")
      .html("Temperature (&#8451;)")
      .attr("x", svgWidth / 2)
      .attr("y", margin.top / 2)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle");

    let yAxisLabel = svg
      .append("text")
      .html("Time (Every 3 Hours)")
      .attr("x", margin.left / 2)
      .attr("y", svgHeight / 2)
      .attr("font-size", "20px")
      .attr("transform", `translate(-160, 350)rotate(-90)`);
  }

  constructor(
    private fb: FormBuilder,
    private forecastService: ForecastService
  ) {}

  ngOnInit() {
    this.weatherForm = this.fb.group({
      userLocationInput: "London, UK"
    });
  }

  onSubmit(event: Event) {
    this.selectedUserLocation = event.target[0].value;
    this.forecastService
      .getForecast(this.selectedUserLocation)
      .subscribe((response: ForecastData) => {
        this.resetChart();
        for (let i = 0; i < response.list.length; i++) {
          this.tempData.push(response.list[i].main.temp);
          this.dates.push(new Date(response.list[i].dt_txt));
        }
        this.drawChart();
        console.log(response);
        console.log(this.tempData);
        console.log(this.dates);
      });
  }
}
