import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef
} from "@angular/core";

// MapBox
import { environment } from "src/environments/environment";
import * as mapbox from "mapbox-gl";
(mapbox as any).accessToken = environment.mapbox.accessToken;
import { Map, NavigationControl } from "mapbox-gl";
import { PowerConsumptionService } from "src/app/services/power-consumption/power-consumption.service";
import { Observable, of, combineLatest } from "rxjs";
import { MapboxLayer } from "@deck.gl/mapbox";
import { ScatterplotLayer, TextLayer } from "@deck.gl/layers";
import { switchMap, map } from "rxjs/operators";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  @ViewChild("mapEl", { static: true })
  mapEL: ElementRef<HTMLDivElement>;

  private map: Map;

  constructor(public zone: NgZone, public powerCon: PowerConsumptionService) {}

  ngOnInit() {}

  initChartOne() {
    let chartMin = -50;
    let chartMax = 100;

    let data = {
      score: 52.7,
      gradingData: [
        {
          title: "Unsustainable",
          color: "#ee1f25",
          lowScore: -100,
          highScore: -20
        },
        {
          title: "Volatile",
          color: "#f04922",
          lowScore: -20,
          highScore: 0
        },
        {
          title: "Foundational",
          color: "#fdae19",
          lowScore: 0,
          highScore: 20
        },
        {
          title: "Developing",
          color: "#f3eb0c",
          lowScore: 20,
          highScore: 40
        },
        {
          title: "Maturing",
          color: "#b0d136",
          lowScore: 40,
          highScore: 60
        },
        {
          title: "Sustainable",
          color: "#54b947",
          lowScore: 60,
          highScore: 80
        },
        {
          title: "High Performing",
          color: "#0f9747",
          lowScore: 80,
          highScore: 100
        }
      ]
    };

    /**
Grading Lookup
 */
    function lookUpGrade(lookupScore, grades) {
      // Only change code below this line
      for (var i = 0; i < grades.length; i++) {
        if (
          grades[i].lowScore < lookupScore &&
          grades[i].highScore >= lookupScore
        ) {
          return grades[i];
        }
      }
      return null;
    }

    // create chart
    let chart = am4core.create("chartdivone", am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = 0;
    chart.fontSize = 11;
    chart.innerRadius = am4core.percent(80);
    chart.resizable = true;

    /**
     * Normal axis
     */

    let axis = chart.xAxes.push(new am4charts.ValueAxis() as any);
    axis.min = chartMin;
    axis.max = chartMax;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 0.1;
    axis.renderer.ticks.template.disabled = false;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.strokeWidth = 0.5;
    axis.renderer.ticks.template.length = 5;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = am4core.percent(15);
    axis.renderer.labels.template.fontSize = "0.9em";

    /**
     * Axis for ranges
     */

    let axis2 = chart.xAxes.push(new am4charts.ValueAxis() as any);
    axis2.min = chartMin;
    axis2.max = chartMax;
    axis2.renderer.innerRadius = 10;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = false;
    axis2.renderer.grid.template.opacity = 0.5;
    axis2.renderer.labels.template.bent = true;
    axis2.renderer.labels.template.fill = am4core.color("#000");
    axis2.renderer.labels.template.fontWeight = "bold";
    axis2.renderer.labels.template.fillOpacity = 0.3;

    /**
Ranges
*/

    for (let grading of data.gradingData) {
      let range = axis2.axisRanges.create();
      range.axisFill.fill = am4core.color(grading.color);
      range.axisFill.fillOpacity = 0.8;
      range.axisFill.zIndex = -1;
      range.value = grading.lowScore > chartMin ? grading.lowScore : chartMin;
      range.endValue =
        grading.highScore < chartMax ? grading.highScore : chartMax;
      range.grid.strokeOpacity = 0;
      range.stroke = am4core.color(grading.color).lighten(-0.1);
      range.label.inside = true;
      range.label.text = grading.title.toUpperCase();
      range.label.inside = true;
      range.label.location = 0.5;
      range.label.inside = true;
      range.label.radius = am4core.percent(5);
      range.label.paddingBottom = -5; // ~half font size
      range.label.fontSize = "0.9em";
    }

    let matchingGrade = lookUpGrade(data.score, data.gradingData);

    /**
     * Label 1
     */

    let label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = "6em";
    label.x = am4core.percent(50);
    label.paddingBottom = 15;
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    //label.dataItem = data;
    label.text = data.score.toFixed(1);
    //label.text = "{score}";
    label.fill = am4core.color(matchingGrade.color);

    /**
     * Label 2
     */

    let label2 = chart.radarContainer.createChild(am4core.Label);
    label2.isMeasured = false;
    label2.fontSize = "2em";
    label2.horizontalCenter = "middle";
    label2.verticalCenter = "bottom";
    label2.text = matchingGrade.title.toUpperCase();
    label2.fill = am4core.color(matchingGrade.color);

    /**
     * Hand
     */

    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(55);
    hand.startWidth = 8;
    hand.pin.disabled = true;
    hand.value = data.score;
    hand.fill = am4core.color("#444");
    hand.stroke = am4core.color("#000");

    hand.events.on("positionchanged", function() {
      label.text = axis2.positionToValue(hand.currentPosition).toFixed(1);
      let value2 = axis.positionToValue(hand.currentPosition);
      let matchingGrade = lookUpGrade(
        axis.positionToValue(hand.currentPosition),
        data.gradingData
      );
      label2.text = matchingGrade.title.toUpperCase();
      label2.fill = am4core.color(matchingGrade.color);
      label2.stroke = am4core.color(matchingGrade.color);
      label.fill = am4core.color(matchingGrade.color);
    });

    setInterval(function() {
      let value = chartMin + Math.random() * (chartMax - chartMin);
      hand.showValue(value, 1000, am4core.ease.cubicOut);
    }, 2000);
  }

  initChartTwo() {
    let chart = am4core.create("chartdivtwo", am4charts.XYChart);

    // Export
    chart.exporting.menu = new am4core.ExportMenu();

    // Data for both series
    let data = [
      {
        year: "2009",
        income: 23.5,
        expenses: 21.1
      },
      {
        year: "2010",
        income: 26.2,
        expenses: 30.5
      },
      {
        year: "2011",
        income: 30.1,
        expenses: 34.9
      },
      {
        year: "2012",
        income: 29.5,
        expenses: 31.1
      },
      {
        year: "2013",
        income: 30.6,
        expenses: 28.2,
        lineDash: "5,5"
      },
      {
        year: "2014",
        income: 34.1,
        expenses: 32.9,
        strokeWidth: 1,
        columnDash: "5,5",
        fillOpacity: 0.2,
        additional: "(projection)"
      }
    ];

    /* Create axes */
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.minGridDistance = 30;

    /* Create value axis */
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    /* Create series */
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.name = "Income";
    columnSeries.dataFields.valueY = "income";
    columnSeries.dataFields.categoryX = "year";

    columnSeries.columns.template.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
    columnSeries.columns.template.propertyFields.stroke = "stroke";
    columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
    columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
    columnSeries.tooltip.label.textAlign = "middle";

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "Power Consumption";
    lineSeries.dataFields.valueY = "expenses";
    lineSeries.dataFields.categoryX = "year";

    lineSeries.stroke = am4core.color("#fdd400");
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.strokeDasharray = "lineDash";
    lineSeries.tooltip.label.textAlign = "middle";

    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
    bullet.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    let circle = bullet.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color("#fff");
    circle.strokeWidth = 3;

    chart.data = data;
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initChartOne();
      this.initChartTwo();
    });

    this.map = new Map({
      container: this.mapEL.nativeElement,
      style: "mapbox://styles/mapbox/light-v9",
      center: { lng: 101.68653, lat: 3.1412 },
      zoom: 6,
      pitch: 20,
      attributionControl: false
    });
    this.map.addControl(
      new NavigationControl({
        showZoom: true,
        showCompass: true
        // visualizePitch: true
      }),
      "top-right"
    );
    this.powerCon.map.next(this.map);

    this.map.on("load", () => {
      console.log("map loaded");
      this.powerCon.map.complete();
    });

    this.powerCon
      .getData('power-consumption')
      .pipe(
        switchMap(d => combineLatest(of(d), this.powerCon.map)),
        map(([d, glMap]) => {
          return this.setLayers(glMap, d);
        })
      )
      .subscribe();
  }

  setLayers(m: Map, data: any): Observable<Map> {
    // const scatter = new MapboxLayer({
    //   id: "scatter",
    //   type: ScatterplotLayer,
    //   data,
    //   source: "scatter",
    //   opacity: 0.8,
    //   filled: true,
    //   radiusMinPixels: 8,
    //   radiusMaxPixels: 10,
    //   getPosition: d => [d.Longitude, d.Latitude],
    //   getFillColor: [200, 0, 40, 150],
    //   pickable: true,
    //   onHover: ({ object, x, y }) => {
    //     if (!!object) {
    //       console.log(object, x, y);
    //     }
    //   }
    // });

    const scatter = new MapboxLayer({
      id: "scatter",
      type: ScatterplotLayer,
      data,
      source: "scatter",
      opacity: 0.8,
      filled: true,
      radiusMinPixels: 8,
      radiusMaxPixels: 10,
      getPosition: d => [d.Longitude, d.Latitude],
      getFillColor: [200, 0, 40, 150],
      pickable: true,
      onHover: ({ object, x, y }) => {
        if (!!object) {
          console.log(object, x, y);
        }
      }
    });

    const textlayer = new MapboxLayer({
      id: "textlayer",
      type: TextLayer,
      data,
      getPosition: d => [d.Longitude, d.Latitude],
      getText: d => d.Negeri,
      getSize: 20
    });

    m.addLayer(scatter);
    m.addLayer(textlayer);
    return of(m);
  }

  ngOnDestory() {
    this.powerCon.map.subscribe(glMap => {
      glMap.removeLayer("scatter");
    });
  }
}
