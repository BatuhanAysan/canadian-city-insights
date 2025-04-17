let rentalData = [];
let cities = [];
let rental1Bedroom = [];
let rental2Bedroom = [];
let avgMonthlySalary = [4795, 4000, 4200, 3000, 3900, 4500, 5100, 3800, 3100, 4600];

    async function fetchData() {
        const response = await fetch('Output/city_rent_population.csv');
        const csvText = await response.text();
        const rows = csvText.split('\n');
        rentalData = rows.map(row => row.split(','));

        // Now rentalData is populated
        createChart();
    }

    function createChart() {
        console.log("Using rentalData:", rentalData);
        // Add your logic here
        rentalData = rentalData.slice(1, rentalData.length);
        rentalData.map((entry) => cities.push(entry[0]));
        rentalData.map((entry) => rental1Bedroom.push(entry[3]));
        rentalData.map((entry) => rental2Bedroom.push(entry[4]));

        const myChart = document.querySelector("#stackedBarLineChart").getContext("2d");

        const data = {
            labels: cities,
            datasets: [
                { 
                    label: "1 Bedroom",
                    // data: [1,2,3,4,5,6,7,8,9,10],
                    data: rental1Bedroom,
                    // stack: "combined",
                    type: "bar"
                },
                { 
                    label: "2 Bedroom",
                    // data: [2,4,6,8,10,12,14,16,18,20],
                    data: rental2Bedroom,
                    backgroundColor: "blue",
                    // stack: "combined",
                    type: "bar"
                },
                {
                    label: "Average Income",
                    // data: [10,10,12,6,9,13,5,13,9,4],
                    data: avgMonthlySalary,
                    borderColor: "lightgray",
                    backgroundColor: "mahogany",
                    borderWidth: 2,
                    tension: 0.3,
                    type: "line",
                    fill: "false",
                    yAxisID: "y"
                }
            ]
        }

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                stacked: false,
                scales: {
                    x: {
                        stacked: false
                    },
                    y: {
                        stacked: false,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Stacked Bar + Line Chart Example'
                    }
                }
            }
        };

        new Chart(myChart, config);
    };

    fetchData();