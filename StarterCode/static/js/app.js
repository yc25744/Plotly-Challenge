//Initialize page
(async function () {
    var data = await d3.json("samples.json");
    console.log(data);

    DemoInfo(data.metadata[0]);
    BarChart(data.samples[0]);
    BubbleChart(data.samples[0]);
})();

//Demoinfo
function DemoInfo(metadata) {
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(metadata).forEach(([key, value]) => {
        panel.append("p").text(`${key}: ${value}`)
    });
}


//Barchart
function BarChart(samples) {


    sample_values = samples.sample_values.slice(0, 10).reverse()
    otu_ids = samples.otu_ids.slice(0, 10).reverse().map(d => "OTU " + d)
    otu_labels = samples.otu_labels.slice(0, 10).reverse()


    var trace = {
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        type: "bar",
        orientation: 'h'
    };


    var plotData = [trace]


    var layout = {
        title: "Top 10 OTU",
        yaxis: {
            categoryorder: 'max ascending'
        }
    }


    Plotly.newPlot("bar", plotData, layout);
};


//BubbleChart
function BubbleChart(samples) {

    sample_values = samples.sample_values
    otu_ids = samples.otu_ids
    otu_labels = samples.otu_labels
    

    var trace1 = {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
            color: otu_ids,
            size: sample_values
        },
        text: otu_labels,
        
    };


    var plotData = [trace1]


    var layout = {
        title: 'OTU ID',
    };

    Plotly.newPlot("bubble", plotData, layout);
};

//Return
async function optionChanged(data) {
    var data = await d3.json("samples.json");
    console.log(data);

    var selectID = d3.select("#selDataset").node().value;

    var newSample = data.samples.filter(row => {
        return row.id == selectID
    })
    var newMetadata = data.metadata.filter(row => {
        return row.id == selectID
    })

    BarChart(newSample[0]);
    BubbleChart(newSample[0]);
    DemoInfo(newMetadata[0]);

};

//dropdown
(async function () {
    var data = await d3.json("samples.json");
    var names = data.names;
    var select = d3.select('#selDataset');
    select.selectAll('option')
        .data(names)
        .enter().append('option')
        .attr('value', d => { return d; })
        .text(d => { return d; });
})()
