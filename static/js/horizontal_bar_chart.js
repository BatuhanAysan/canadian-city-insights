let employmentChart;
let cityData = [];
let sectorLabels = [];
let emptyData = [];
let calgaryData = [];
let edmontonData = [];
let montrealData = [];
let ottawaData = [];
let torontoData = [];
let vancouverData = [];
let winnipegData = [];

async function fetchEmploymentData() {
    const response = await fetch("../../Output/employment_sectors_by_city_df.csv");
    const csvText = await response.text();
    const rows = csvText.split("\n");
    cityData = rows.map(row => row.split(","));

    sectorLabels = cityData.slice(0, 1)[0].slice(1, cityData[0].length-1);
    cityData = cityData.slice(1, cityData.length);
    calgaryData = cityData[0].slice(1, cityData[0].length-1);
    edmontonData = cityData[1].slice(1, cityData[1].length-1);
    montrealData = cityData[2].slice(1, cityData[2].length-1);
    ottawaData = cityData[3].slice(1, cityData[3].length-1);
    torontoData = cityData[4].slice(1, cityData[4].length-1);
    vancouverData = cityData[5].slice(1, cityData[5].length-1);
    winnipegData = cityData[6].slice(1, cityData[6].length-1);

    createEmploymentChart(sectorLabels, emptyData);
}

function createEmploymentChart(labelsData, importedData) {
    if(employmentChart) {
        employmentChart.destroy();
    }

    let ctx = document.querySelector("#employmentSectorData").getContext("2d");

    const DATA_COUNT = importedData.length;
    const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

    const labels = labelsData;
    const data = {
        labels: labels,
        datasets: [
            {
                label: importedData[0],
                data: importedData,
                borderColor: "black",
                backgroundColor: ["red", "orange", "yellow", "brown", "blue", "green", "purple"]
            },
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    display: false
                },
                title: {
                    display: true,
                    text: 'Employment Count In Sectors by City (In Thousands)'
                }
            }
        },
    };

    employmentChart = new Chart(ctx, config);
};

let cityDropdown = document.querySelector("#citySelect");
cityDropdown.addEventListener("change", (event) => {
    let selectedCity = event.target.value;
    if(selectedCity == "Brampton" || selectedCity == "Mississauga" || selectedCity == "Hamilton") {
        selectedCity = "Toronto";
    }

    const cityDataMap = {
        calgary: calgaryData,
        edmonton: edmontonData,
        montreal: montrealData,
        ottawa: ottawaData,
        toronto: torontoData,
        vancouver: vancouverData,
        winnipeg: winnipegData
    };

    const dataArray = cityDataMap[selectedCity.toLowerCase()];
    createEmploymentChart(sectorLabels, dataArray);
});

fetchEmploymentData();