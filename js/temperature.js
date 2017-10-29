function showTemperature() {

    var margin = {top: 20, right: 20, bottom: 100, left: 60},
        height = 500 - margin.top - margin.bottom,
        width = 800 - margin.left - margin.right,
        x = d3.scale.ordinal().rangeRoundBands([0, width], 0.5),
        y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
        .innerTickSize(-width)
        .outerTickSize(10)
        .tickPadding(10);

    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("http://localhost:8080/Sensor_Data/php/getdata.php", function (data) {
        x.domain(data.map(function (d) {
            return d.datetime;
        }));

        y.domain([-100, d3.max(data, function (d) {
            return d.air_temperature;
        })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + ((height/2) - 10)  + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-0.5em")
            .attr("dy", "-0.55em")
            .attr("y", 30)
            .attr("transform", "rotate(-45)");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("tranform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", "0.8em")
            .attr("text-anchor", "end")
            .text("Member Rank");

        svg.selectAll("bar")
            .data(data)
            .enter()
            .append("rect")
            .style("fill", "Orange")
            .attr("x", function (d) {
                return x(d.datetime);
            })
            .attr("width", x.rangeBand())
            .attr("y", function (d) {
                //Minuswerte überprüfen
                if(d.rank < 0) {
                    return y(0);
                } else {
                    return y(d.air_temperature);
                }
            })
            .attr("height", function (d) {
                //Minuswerte überprüfen
                if (d.rank < 0) {
                    return height/2 - y(-d.air_temperature);
                } else {
                    return (height/2 -10) - y(d.air_temperature);
                }

            })
            .on("mouseover", function () {
                tooltip.style("display", null);
            })
            .on("mouseout", function () {
                tooltip.style("display", "none");
            })
            .on("mousemove", function (d) {
                var xPos = d3.mouse(this)[0] - 15;
                var yPos = d3.mouse(this)[1] - 55;

                tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
                tooltip.select("text").text(d.datetime + " : " + d.air_temperature);
            });

        var tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("font-size", "1.25em")
            .style("font-weight", "bold");
    });
}


