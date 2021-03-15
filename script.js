

        /* DEFINE DIMENSIONS AND GENERATE SVG */
        var width = window.innerWidth;
        var height= window.innerHeight;
        var maxRadius = 60;

        var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        /* CREATE A COLOR PALETTE
        Play around with the color scale interpolator, using a different value:
          d3.interpolateInferno
          d3.interpolateViridis
          d3.interpolateMagma
          d3.interpolatePlasma
          d3.interpolateWarm
          d3.interpolateCool
          d3.interpolateRainbow
          d3.interpolateCubehelixDefault
        */

        //we are going to pass in a random value and between 0 and 1 into this function,depending what the value and we will get the color through the interpolatePlasma

        var colorScale = d3.scaleSequential(d3.interpolateRainbow)
            .domain([0,1])

  var bg = svg.append("rect")
    .attr("x", width/200)
    .attr("y",height/200)
    .attr("width",width)
    .attr("height", height)
    .attr("fill","black");



        /* START WITH SIMPLE CLICK INTERACTIVITY

        Start with just a click event that draws a circle
        with random size and color

        */

        svg.on("click",function(){

          //first register where we have click --> draw new svg circle element 
          // correspond to the place we click

          var position = d3.mouse(this);  //this is the contax Listen for the mouse even with different contax -- can be specfy
          var cx = d3.mouse(this)[0];
          var cy = d3.mouse(this)[1];
          
          var x0 = 1/3 * width - 170;
          var x1 = 1/3 * width + 170;
          var y0 = 1/3 * height - 170;
          var y1 = 1/3 * height + 170;
          
          if (cx <= x0 || cx >= x1 || cy <= y0 || cy >= y1) {
          svg.append("circle")
                .attr("cx", position[0])
                .attr("cy", position[1])
                .attr("r", Math.random() * maxRadius)
                .attr("opacity", 0.8)
                .attr("fill",colorScale(Math.random()))
              }

        });

        /* ALTERNATIVE INTERACTIVITY WITH MOUSEMOVE

        Then change to continuous mousemove event,
        where color and radius increment uniformly

        */

        var colorIndex = 0;



        //svg.on("click",function(){
      var bg1 = svg.on("mousemove",function(){

              if(colorIndex > 1){
                colorIndex = 0;
              }
        //to make sure our color index will always be in the range 0 and 1

              colorIndex += 0.05;

          var cx = d3.mouse(this)[0];
          var cy = d3.mouse(this)[1];

          var x0 = 1/3 * width - 170;
          var x1 = 1/3 * width + 170;
          var y0 = 1/3 * height - 170;
          var y1 = 1/3 * height + 170;
          if (cx <= x0 || cx >= x1 || cy <= y0 || cy >= y1) {
          svg.append("circle")
                .attr("cx", cx)
                .attr("cy", cy)
                .attr("r", 7)
                .attr("opacity", 0.8)
                .attr("fill",colorScale(colorIndex))
                  .transition()
                    .duration(5000)
                    .attr("r",Math.random() * maxRadius)
                    .attr("fill","none")
                    .attr("stroke",colorScale(colorIndex))
                    .attr("opacity", 0);
                  }
        });

  //DEFINE DATA SET
//for the circle it needs cx, cy, radius, fill

var dataPlanets = [
  {cx: 1/3 * width, cy: 1/3 * height,r:150, fill:"white", note:"Welcom to Yolo"},
  {cx: 2/3 * width, cy: 7/10 * height,r:30, fill:"#A9A9A9", note:"click to active your planet"}
];

//draw main yolo planet

var space = bg1.selectAll("circle")
  .data(dataPlanets)
  .enter()
  .append("circle");

//initial planet
var planets0 = space
    .attr("cx", function(d) { return d.cx; })
    .attr("cy", function(d) { return d.cy; })
    .attr("r", function(d) { return d.r})
    .attr("fill", function(d) { return d.fill});


planets0.on("mouseover", function(d) {
    d3.select(this)
      .attr("stroke","#F6C900")
      .attr("stroke-width",3);
    });

// draw user planet

//Add the SVG Text Element to the svgContainer
var text = svg.selectAll("text")
                        .data(dataPlanets)
                        .enter()
                        .append("text")
                        .attr("x", function(d) { return d.cx - (2/3 * d.r); })
                        .attr("y", function(d) { 
                          if (d.r > 30){
                            return d.cy;
                          } else {
                            return d.cy + 30;
                          }
                        })
                        .text(function(d){return d.note;})
                        .attr("font-family", "sans-serif")
                        .attr("font-size", function(d){
                          if (d.r > 30){
                            return "36px";
                          } else {
                            return "12 px";
                          }
                        })
                        .attr("fill", "red");





