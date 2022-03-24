


// FUNCTION 1, set init() for dashboard and do dropdown button
function init() {

// select dropdown menu 
var dropdown = d3.select("#selDataset");

// read the data 
d3.json("samples.json").then((data)=> {
  console.log(data)

  // get the id data to the dropdwown menu
  data.names.forEach(function(name) {
      dropdown.append("option").text(name).property("value",name);
  });
});
}

init();

// Function 4, to get the necessary data for demographic box

function getDemoInfo(id) {

  // read the json file to get data
      d3.json("samples.json").then((data)=> {

  // get the metadata info for the demographic panel
        var metadata = data.metadata;
        console.log(metadata)
  
        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
          
       // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");
  
       // grab the necessary demographic data data for the id and append the info to the panel
       // `$...` is similar to f string in python,
        Object.entries(result).forEach(([key,value]) => {
          demographicInfo.append("h5").text(`${key.toUpperCase()} : ${value}`);    
          });
      });
  }

  // FUNCTION 3, use function to do the change event
//(user click and change the id with appropriate content box)

function optionChanged(id) {
  getDemoInfo(id);
}

// Find the values for bar & buble charts from sample.js
// Create the 1st function to get data set out and use further:
// & use d3 to call the data from json file and put them in a place we name "data" to use further

// Function 5: to get id, sample_values, otu_ids, otu_labels of TOP 10

function tracie(sampleValue) {
  // var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
      console.log(data)

      var metadatas = data.metadata
      console.log(metadatas)

      var samples = data.samples
      console.log(samples)
      
      var filteredSample = samples.filter(sampleObj => sampleObj.id == sampleValue)[0]
      console.log(filteredSample)

      var filteredmetadata = metadatas.filter(sampleObj => sampleObj.id == sampleValue)[0]
      console.log(filteredmetadata)

    // Filter the data for the object with the desired sample number (id:940)
            // get the "samples" from data set first: 
       
      var otu_id = filteredSample.otu_ids;
      console.log(otu_id)
      
      var otu_labels = filteredSample.otu_labels;
      console.log(otu_labels)
      
      var sample_value = filteredSample.sample_values;
      console.log(sample_value)

    // now create BAR CHART with above 3 arrays
    // Create a function for plotting first: 
    
// create a Trace for plotting:
      var bar_values = [{
          x : sample_value.slice(0,10).reverse(),
          y : otu_id.slice(0,10).map(otu_id=> `OTU ${otu_id}`).reverse(),
          text: otu_labels.slice(0,10).reverse(),
          type: "bar",
          orientation: "h",
          marker: {color: "red"},
      }]
      
    // define the bar layout format: 
      var bar_format = {
          title: "Top 10 Microbial Species in Belly Button",
          xaxis: "Bacteria Sample Values",
          yaxis: "OTU IDs"
      };
      
      Plotly.newPlot("bar", bar_values, bar_format)

   // Create BUBBLE CHART for each sample ids with otu_ids and sample_values   
      var bubble_values = [{
          x: otu_id,
          y: sample_value,
          text: otu_labels,
          mode: "markers",
          marker: {
              color: otu_id,
              size: sample_value,
              colorscale: "continent"
        }
      }];

    // Define bubble layout format:   
      var layout = {
        title: "Belly Button Samples",
        xaxis: {title: "OTU IDs"},
        yaxis: {title: "Sample Values"}
      };

      Plotly.newPlot("bubble", bubble_values, layout)
    
   // GAUGE CHART (advance)

        // Create variable for washing frequency
      var washFreq = filteredmetadata.wfreq

        // Create the trace
      var gauge_data = [{
                domain: { x: [0, 1], y: [0, 1] },
                value: washFreq,
                title: { text: "Washing Frequency (Times per Week)" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    bar: {color: 'white'},
                    axis: { range: [null, 9] },
                    steps: [
                        { range: [0, 3], color: 'rgb(253, 162, 73)' },
                        { range: [3, 6], color: 'rgb(242, 113, 102)' },
                        { range: [6, 9], color: 'rgb(166, 77, 104)' },
                    ],
                }
            }
        ];

        // Define Plot layout
        var gauge_layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };

        // Display plot
        Plotly.newPlot('gauge', gauge_data, gauge_layout);
    })
     
};