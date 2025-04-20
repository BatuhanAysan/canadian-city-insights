let doughnutChart;
let cityData = [];
let sectorNames = [];
let cityNames = [];
let goodsProducingData = [];
let agricultureData = [];
let extractingData = [];
let utilitiesData = [];
let constructionData = [];
let manufacturingData = [];
let servicesProducingData = [];
let wholesaleAndRetailData = [];
let transportationAndWarehousingData = [];
let financeData = [];
let professionalScientificAndTechnicalServicesData = [];
let businessData = [];
// let buildingAndOtherSupportServicesData = [];
let educationalServicesData = [];
let healthcareAndSocialAssistanceData = [];
let informationData = [];
// let cultureAndRecreationData = [];
let accommodationAndFoodServicesData = [];
let publicAdminData = [];
let otherServicesData = [];
let totalEmployedData = [];

async function fetchDoughnutData() {
    const response = await fetch('../../Output/employment_sectors_by_city_df.csv');
    const csvText = await response.text();
    const rows = csvText.split('\n');
    cityData = rows.map(row => row.split(','));
    
    for(let i = 4; i < cityData[0].length; i++) {
        sectorNames.push(cityData[0][i]);
    }
    cityData = cityData.slice(1, cityData.length);
    cityData.map((data) => {
        cityNames.push(data[0])
        goodsProducingData.push(data[4]);
        agricultureData.push(data[5]);
        extractingData.push(data[6]);
        utilitiesData.push(data[7]);
        constructionData.push(data[8]);
        manufacturingData.push(data[9]);
        servicesProducingData.push(data[10]);
        wholesaleAndRetailData.push(data[11]);
        transportationAndWarehousingData.push(data[12]);
        financeData.push(data[13]);
        professionalScientificAndTechnicalServicesData.push(data[14]);
        businessData.push(data[15]);
        // buildingAndOtherSupportServicesData.push(data[16]);
        educationalServicesData.push(data[16]);
        healthcareAndSocialAssistanceData.push(data[17]);
        informationData.push(data[18]);
        // cultureAndRecreationData.push(data[20]);
        accommodationAndFoodServicesData.push(data[19]);
        publicAdminData.push(data[20]);
        otherServicesData.push(data[21]);
        totalEmployedData.push(data[22]);
    });
    createDoughnutChart(cityNames, totalEmployedData);
}

function createDoughnutChart(labelsData, importedData) {
    if (doughnutChart) {
        doughnutChart.destroy();
    }

    let ctx = document.querySelector("#employmentSectorData").getContext("2d");
    
    const DATA_COUNT = 7;
    const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

    const labels = labelsData;
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: importedData,
                borderColor: "black",
                backgroundColor: ["red", "orange", "yellow", "brown", "blue", "green", "purple"]
            }
        ]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Employment Count In Sectors by City (In Thousands)'
            }
            }
        },
    };

    doughnutChart = new Chart(ctx, config);

}

let doughnutDropDown = document.querySelector("#employmentSectorDropdown");
doughnutDropDown.addEventListener("change", (event) => {
    const selectedSector = event.target.value;

    const sectorMap = {
        // "All Sectors": totalEmployedData,
        // 'totalEmployedData': totalEmployedData,
        'goodsProducingData': goodsProducingData,
        'agricultureData': agricultureData,
        'extractingData': extractingData,
        'utilitiesData': utilitiesData,
        'constructionData': constructionData,
        'manufacturingData': manufacturingData,
        "servicesProducingData" : servicesProducingData,
        "wholesaleAndRetailData" : wholesaleAndRetailData,
        "transportationAndWarehousingData" : transportationAndWarehousingData,
        "financeData" : financeData,
        "professionalScientificAndTechnicalServicesData" : professionalScientificAndTechnicalServicesData,
        "businessData" : businessData,
        // "buildingAndOtherSupportServicesData" : buildingAndOtherSupportServicesData,
        "educationalServicesData" : educationalServicesData,
        "healthcareAndSocialAssistanceData" : healthcareAndSocialAssistanceData,
        "informationData" : informationData,
        // "cultureAndRecreationData" : cultureAndRecreationData,
        "accommodationAndFoodServicesData" : accommodationAndFoodServicesData,
        "publicAdminData" : publicAdminData,
        "otherServicesData" : otherServicesData,
        "totalEmployedData" : totalEmployedData,
    };

    const selectedData = sectorMap[selectedSector];
    
    console.log(selectedSector);
    if (selectedData) {
        createDoughnutChart(cityNames, selectedData);
    } else {
        console.error("Invalid selection or missing data for:", selectedSector);
    }
});

fetchDoughnutData();