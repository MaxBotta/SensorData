function linegraph(id, data, color, ) {


    function setZeroValues(array, ) {
        for(var i = 0; i < array.length; i++) {
            array[i].datetime = data[i].datetime.substr(11, 2);
        }
        array.splice(0, 0, {datetime:7, air_temperature:0});
        array.push({datetime:16, air_temperature:0});
        return array;
    }

   setZeroValues(data);


    var container = document.getElementById(id);

    var margin = {top: 20, right: 0, bottom: 0, left: 0},
        width = container.offsetWidth - margin.left - margin.right,
        height = container.offsetHeight - margin.top - margin.bottom;

// Parse the date / time
    //var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(10).innerTickSize(-height).outerTickSize(0);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5).innerTickSize(width).outerTickSize(0);

// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.datetime); })
        .y(function(d) { return y(d.air_temperature); });
        //.interpolate("basis");

// Adds the svg canvas
    var svg = d3.select("#" + id)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.datetime; }));
        //y.domain([0, 0.5 + d3.max(data, function(d) { return d.air_temperature; })]);
        y.domain([0, 30]);

        // Add the valueline path.
        svg.append("path")
            .attr("class", "valueline")
            //.attr("fill", color)
            .attr("d", valueline(data));

        // Add the X Axis
        // svg.append("g")
        //     .attr("class", "x axis")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(xAxis)
        //     .selectAll("text")
        //     .attr("y", -15)
        //     .attr("text-anchor", "start")
        //     .style("font-size", "10px");

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .selectAll("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("font-size", "10px");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("tranform", "rotate(-90)")
            .attr("y", 0)
            .attr("x", width-20)
            .attr("dy", "0.8em")
            .attr("text-anchor", "end")
            .text("Celsius");

}