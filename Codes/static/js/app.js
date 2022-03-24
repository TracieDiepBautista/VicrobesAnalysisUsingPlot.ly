


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

// function tracie(sampleValue) {
//   var selector = d3.select("#selDataset");
//     d3.json("samples.json").then((data) => {
//       console.log(data)

//       var metadatas = data.metadata
//       console.log(metadatas)
      
//       var result = metadatas.filter(sampleObj => sampleObj.id == sampleValue)
//       console.log(result)

//     // Filter the data for the object with the desired sample number (id:940)
//             // get the "samples" from data set first: 
      
//       var sampledata = data.samples[0].sample_values;
//       console.log(sampledata)
      
//       var otu_id = data.samples[0].otu_ids;
//       console.log(otu_id)
      
//       var otu_labels = data.samples[0].otu_labels;
//       console.log(otu_labels)
      
//       var sample_value = data.samples[0].sample_values;
//       console.log(sample_value)  

//     // now create BAR CHART with above 3 arrays
//     // Create a function for plotting first: 
    
// // create a Trace for plotting:
//       var bar_values = [{
//           x : sample_value,
//           y : otu_id,
//           text: otu_labels,
//           type: "bar",
//           orientation: "horizontal",
//           marker: {color: "red"},
//       }]
      
//     // define the bar layout format: 
//       var bar_format = {
//           title: "Top 10 Microbial Species in Belly Button",
//           xaxis: "Bacteria Sample Values",
//           yaxis: "OTU IDs"
//       };
      
//       Plotly.newPlot("bar", bar_values, bar_format)

//     });

//    // Create BUBBLE CHART for each sample ids with otu_ids and sample_values   
//       var bubble_values = [{
//           x: otu_id,
//           y: sample_value,
//           text: otu_labels,
//           mode: "markers",
//           marker: {
//               color: otu_id,
//               size: sample_value,
//               colorscale: "continent"
//         }
//       }];

//     // Define bubble layout format:   
//       var layout = {
//         title: "Belly Button Samples",
//         xaxis: {title: "OTU IDs"},
//         yaxis: {title: "Sample Values"}
//       };

//       Plotly.newPlot("bubble", bubble_values, layout)};
            
      
      