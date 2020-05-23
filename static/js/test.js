//DemoInfo
function DemoInfo(metadata) {
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(metadata).forEach(([key, value]) => {
        panel.append("p").text(`${key}: ${value}`)
    });
}

function Barchart(data) {

    xvalue = data.sample_value.slice(0, 10).reverse()
    yvalue = data.otu_ids.slice(0, 10).reverse().map(d => "OTU " + d)
    textvalue = data.otu_labels.slice(0.10)

    var trace = {
        x: xvalue,
        y: yvalue,
        text: textvalue,
        type: "bar",
        orientation: "h"
    };

    var plotData = [trace]

    // Set the layout
    var layout = {
        title: "Top 10 OTUs",
        xaxis: { title: "Sample Values" },
        yaxis: { type: "category" }
    };

    //Plot using plotly
    Plotly.newPlot("bar", plotData, layout);
};


function Bubblechart(data) {

    // Define variables
    sample_values = data.sample_values
    otu_ids = data.otu_ids
    otu_labels = data.otu_labels

    // Create the trace
    var trace1 = {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
            color: otu_ids,
            size: sample_values
        },
        text: otu_labels
    };

    // Set the variable to plot
    var plotData = [trace1]

    // Set the layout
    var layout = {
        title: 'OTU ID Sample Values',
    };

    //Plot using plotly
    Plotly.newPlot("bubble", plotData, layout);
};

async function optionChanged(id){
    var data = await d3.json("samples.json");
    var metaData = data.metadata.filter(item => item.id == id)
    var sample = data.samples.filter(item => item.id ==  id)
    DemoInfo(metaData[0]);
    BarChart(sample[0]);
    Bubblechart(sample[0]);
}

(async function(){
    var data = await d3.json("samples.json");
    var names = data.names;

    var select = d3.select('#selDataset');    
    select.selectAll('option')
    .data(names)
    .enter().append('option')
    .attr('value', d => { return d; })
    .text(d => { return d; });

    //Calls function against first item in select list. Decided to default first item.
    optionChanged(select.node().value);
})()
