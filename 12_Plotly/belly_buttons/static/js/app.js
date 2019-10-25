
function buildMetadata(sample) {

  d3.json(`/metadata/${sample}`).then(function(selection) {
    console.log(selection);

    
    var metadata = d3.select("#sample-metadata");

    
    metadata.html("");    

    
    Object.entries(selection).forEach(([key, value]) => {
      metadata.append("h6").text(`${key}: ${value}`);
    });
 });
}

function buildCharts(sample) {

  
  d3.json(`/samples/${sample}`).then(function(selection) {
    console.log(selection);

    const otuIds = selection.otu_ids;
    const sampleValues = selection.sample_values;
    const otuLabels = selection.otu_labels;

  
    var pieData = [{
      values: sampleValues.slice(0, 10),
      labels: otuIds.slice(0, 10),
      hoverinfo: otuLabels,
      type: "pie"
    }];

    var pieLayout = {
      margin: {t: 0, 1: 0}
    };
  
    Plotly.plot("pie", pieData, pieLayout);
  });
}

function init() {
 
  var selector = d3.select("#selDataset");

\
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

   
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
 
  buildCharts(newSample);
  buildMetadata(newSample);
}


init();