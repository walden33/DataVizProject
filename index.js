const titleText = "30 Years of Asylum in the United States";

const nScene = 5;

let scene = 1;

let newestActiveYear = 1989;

let currentActiveYear = 1989;

let data;


// Chart parameters
const margin = { top: 30, right: 60, bottom: 30, left: 60 },
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
const pieInnerRadius = 50;
const pieOuterRadius = 90;

// Create charts and d3 selections
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const pieChart = d3.select("#pie-chart")
    .append("svg")
    .attr("width", 320)
    .attr("height", 220)
    .append("g")
    .attr("transform", `translate(${pieOuterRadius},${pieOuterRadius})`);

const pieChart1 = d3.select("#pie-chart-1")
    .append("svg")
    .attr("width", 320)
    .attr("height", 220)
    .append("g")
    .attr("transform", `translate(${pieOuterRadius},${pieOuterRadius})`);

const x = d3.scaleLinear()
    .domain([1990, 2019])
    .range([0, width]);
svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

const y = d3.scaleLinear()
    .domain([0, 50000])
    .range([height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));

svg.append("g").append("text").text("# of Granted Asylum Cases")
    .attr("transform", "translate(-45,250) rotate(-90)")

const annotation = svg.append("g");

// Chart rendering functions
const renderChart = data => {

    const line = svg.selectAll(".line").data([data]);
    line.join("path")
        .transition().duration(1000)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(d => x(d.Year))
            .y(d => y(d.Total))
        )

};

// Region pie chart renderer
const renderPieChart = data => {

    // Creating Pie generator
    const pie = d3.pie().sort(null);

    // Creating arc
    const arc = d3.arc()
        .innerRadius(pieInnerRadius)
        .outerRadius(pieOuterRadius);

    const path = pieChart.selectAll("path")
        .data(pie(data));

    const pathEnter = path.enter().append("path")
        .attr("fill", (_, i) => d3.schemeSet1[i])
        .attr("d", arc);

    const pathUpdate = path.attr("d", arc);

    // Legend
    if (d3.select("#pie_chart_legend_0").empty()) {
        const labelHeight = 12;
        const legend = pieChart.append('g')
            .attr("id", "pie_chart_legend_0")
            .attr('transform', `translate(${pieOuterRadius + 15},${-pieOuterRadius * 0.8})`);

        legend
            .selectAll(null)
            .data(pie(data))
            .enter()
            .append('rect')
            .attr('y', (_, i) => labelHeight * i * 1.8)
            .attr('width', labelHeight)
            .attr('height', labelHeight)
            .attr('fill', (_, i) => d3.schemeSet1[i])
            .attr('stroke', 'grey')
            .style('stroke-width', '1px');

        legend
            .selectAll(null)
            .data(["Asia", "Africa", "SouthAmerica", "Europe", "NorthAmerica", "Oceania", "Unknown"])
            .enter()
            .append('text')
            .text(d => d)
            .attr('x', labelHeight * 1.2)
            .attr('y', (_, i) => labelHeight * i * 1.8 + labelHeight)
            .style('font-family', 'sans-serif')
            .style('font-size', `${labelHeight}px`);
    }

}

// Affirmative/Defensive pie chart renderer
const renderPieChart1 = data => {

    // Creating Pie generator
    const pie = d3.pie().sort(null);

    // Creating arc
    const arc = d3.arc()
        .innerRadius(pieInnerRadius)
        .outerRadius(pieOuterRadius);

    const path = pieChart1.selectAll("path")
        .data(pie(data));

    const pathEnter = path.enter().append("path")
        .attr("fill", (_, i) => d3.schemeSet2[i])
        .attr("d", arc);

    const pathUpdate = path.attr("d", arc);

    // Legend
    if (d3.select("#pie_chart_legend_1").empty()) {
        const labelHeight = 12;
        const legend = pieChart1.append('g')
            .attr("id", "pie_chart_legend_1")
            .attr('transform', `translate(${pieOuterRadius + 15},${-pieOuterRadius * 0.8})`);

        legend
            .selectAll(null)
            .data(pie(data))
            .enter()
            .append('rect')
            .attr('y', (_, i) => labelHeight * i * 1.8)
            .attr('width', labelHeight)
            .attr('height', labelHeight)
            .attr('fill', (_, i) => d3.schemeSet2[i])
            .attr('stroke', 'grey')
            .style('stroke-width', '1px');

        legend
            .selectAll(null)
            .data(["Affirmative", "Defensive"])
            .enter()
            .append('text')
            .text(d => d)
            .attr('x', labelHeight * 1.2)
            .attr('y', (_, i) => labelHeight * i * 1.8 + labelHeight)
            .style('font-family', 'sans-serif')
            .style('font-size', `${labelHeight}px`);
    }

    // Footnote
    if (d3.select("#pie_chart_1_footnote").empty()) {
        pieChart1.append("g").attr("id", "pie_chart_1_footnote")
            .selectAll(null)
            .data(
                ["Note: Defensive asylum occurs when",
                " someone requests asylum to prevent",
                "removal from the United States."])
            .enter().append("text")
                .text(d => d)
                .style("font-size", "10pt")
                .attr("x", 100)
                .attr("y", (_,i) => 50 + i * 14)
    }

}

// Update display elements by scene parameter

const updateText = () => {
    const text = [
        {
            text: ["Every year people come to the United States",
                "seeking protectionbecause they have suffered",
                "persecution or fear that they will suffer persecution"],
            xShift: 10,
            yShift: 10,
            w: 300,
            h: 55
        },
        {
            text: ["From 1990 to 2001, annual",
                "asylum granted cases was",
                "steadily increasing."],
            xShift: 20,
            yShift: 60,
            w: 165,
            h: 55
        },
        {
            text: ["After 9-11, asylum",
                "admission drastically",
                "decrased."],
            xShift: 180,
            yShift: 200,
            w: 130,
            h: 55
        },
        {
            text: ["During Obama administration,",
                "number of total granted cases",
                "stabilized."],
            xShift: 330,
            yShift: 100,
            w: 180,
            h: 55,
        },
        {
            text: ["In Trump Era,",
                "granted asylum",
                "cases rallied",
                "back, but so was",
                "denied cases. The",
                "approval rate",
                "even decreased."],
            xShift: 490,
            yShift: 230,
            w: 118,
            h: 114,
        }
    ]

    if (scene === 1) {
        // If the scene is the first scene (either when initialization
        // or when going back), clear all annotations and add the one
        // for the first scene.
        d3.selectAll(".anno").remove();
        const g = annotation.append("g")
            .attr("class", "anno")
            .attr("id", `anno_${scene}`);
        // add text
        g.selectAll("text").data(text[0].text).enter()
            .append("text")
            .attr("x", 5 + text[0].xShift)
            .attr("y", (_, i) => 5 + i * 15 + text[0].yShift)
            .style("font-size", "10pt")
            .text(d => d)
            .transition().duration(1000);
        // add textbox
        g.append("rect")
            .attr("x", text[0].xShift)
            .attr("y", text[0].yShift - 12)
            .attr("width", text[0].w)
            .attr("height", text[0].h)
            .attr("fill", "transparent")
            .attr("stroke", "#F85797")
            .attr("stroke-width", "2px");
    } else {
        // If the scene is not the first scene, remove annotation of the
        // first scene
        d3.select("#anno_1").remove();
        // Append annotations based on current scene number
        for (let si = scene; si > 1; si--) {
            if (d3.select(`#anno_${si}`).empty()) {
                const g = annotation.append("g")
                    .attr("class", "anno")
                    .attr("id", `anno_${si}`);
                // add text
                g.selectAll("text").data(text[si - 1].text).enter()
                    .append("text")
                    .attr("x", 5 + text[si - 1].xShift)
                    .attr("y", (_, i) => 5 + i * 15 + text[si - 1].yShift)
                    .style("font-size", "10pt")
                    .text(d => d)
                    .transition().duration(1000);
                // add textbox
                g.append("rect")
                    .attr("x", text[si - 1].xShift)
                    .attr("y", text[si - 1].yShift - 12)
                    .attr("width", text[si - 1].w)
                    .attr("height", text[si - 1].h)
                    .attr("fill", "transparent")
                    .attr("stroke", "#F85797")
                    .attr("stroke-width", "2px");
            }
        }
    }
}

const updateBtn = () => {
    // Make previous scene button light
    d3.selectAll(".btn-dark").attr("class", "btn btn-light");
    // Make current scene button dark
    d3.select(`#s_${scene}`).attr("class", "btn btn-dark");
};

const updateActiveYear = () => {
    if (scene === 1) {
        newestActiveYear = 2001;
    } else if (scene === 2) {
        newestActiveYear = 2001;
    } else if (scene === 3) {
        newestActiveYear = 2008;
    } else if (scene === 4) {
        newestActiveYear = 2016;
    } else if (scene === 5) {
        newestActiveYear = 2019;
    }
}

const updateChart = () => {
    renderChart(data.filter(d => d.Year <= newestActiveYear));
}

const updatePieChart = () => {
    const d = data[currentActiveYear - 1990];
    renderPieChart(
        [d.Asia, d.Africa, d.SouthAmerica, d.Europe, d.NorthAmerica, d.Oceania, d.Unknown]
    );
    renderPieChart1([d.Affirmative, d.Defensive]);
}

const updateScene = (i = undefined) => {
    if (i !== undefined) {
        scene = i;
    }
    updateBtn();
    updateActiveYear();
    updateChart();
    updateText();
}

// Button callbacks
const nextScene = () => {
    if (scene < nScene) {
        scene++;
        updateScene();
    }
}

const previousScene = () => {
    if (scene > 1) {
        scene--;
        updateScene();
    }
}

// Tooltip
const focus = svg.append("g")
    .attr("class", "focus")
    .style("display", "none");

focus.append("circle")
    .attr("r", 5);

focus.append("rect")
    .attr("class", "tooltip")
    .attr("width", 100)
    .attr("height", 50)
    .attr("x", 10)
    .attr("y", -22)
    .attr("rx", 4)
    .attr("ry", 4);

focus.append("text")
    .attr("class", "tooltip-year")
    .attr("x", -18)
    .attr("y", -34);

focus.append("text")
    .attr("x", -18)
    .attr("y", -14)
    .text("Total Granted:");

focus.append("text")
    .attr("class", "tooltip-value")
    .attr("x", 70)
    .attr("y", -14);

svg.append("rect")
    .attr("class", "tooltip-overlay")
    .attr("width", width)
    .attr("height", height)
    .on("mouseover", () => focus.style("display", null))
    .on("mouseout", () => focus.style("display", "none"))
    .on("mousemove", mousemove);

const bisectYear = d3.bisector(d => d.Year).left;
function mousemove(e) {
    const x0 = x.invert(d3.pointer(e)[0]),
        i = bisectYear(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.Year > d1.Year - x0 ? d1 : d0;

    if (d.Year > newestActiveYear) {
        focus.style("display", "none");
        return 0;
    } else {
        currentActiveYear = d.Year;
        updatePieChart();
    }

    const transX = (year) => {
        if (year < 2017) return x(year);
        else return x(year) - 80;
    }
    focus.select("circle").attr("transform", `translate(${x(d.Year)},${y(d.Total)})`);
    focus.selectAll("text").attr("transform", `translate(${transX(d.Year)},${y(d.Total)})`);
    focus.select(".tooltip-year").text(d.Year);
    focus.select(".tooltip-value").text(d.Total);
}


async function main() {
    d3.select("#title").select("h2").html("Loading data ...");
    data = await d3.csv("https://raw.githubusercontent.com/liyuan31/DataVizProject/master/data/asylum_90_to_19.csv");
    d3.select("#title").select("h2").html(titleText);
    updateScene();
}

main();