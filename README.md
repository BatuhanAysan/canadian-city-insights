# Canadian City Insights Dashboard

![HTML](https://img.shields.io/badge/HTML-5-orange?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-3-blue?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-Maps-green?logo=leaflet&logoColor=white)
![Plotly](https://img.shields.io/badge/Plotly-Graphs-blueviolet?logo=plotly&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-Bar%20Charts-red?logo=chartdotjs&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-Data%20Cleaning-purple?logo=pandas&logoColor=white)

## 📄 Description

Canadian City Insights Dashboard is an interactive web application that provides key insights into the rental prices, amenities, employment sectors, and unemployment rates across major Canadian cities. 

The dashboard combines interactive maps and visualizations to help users explore:
- Average rental prices by city
- Availability of amenities like hospitals, schools, and supermarkets
- Employment distribution across different sectors
- Unemployment rates per city

Data cleaning and preparation were performed using **Python** and **Pandas** within Jupyter Notebooks. The final interactive dashboard was built using **HTML**, **CSS**, **JavaScript**, and several visualization libraries.


## 🚀 Live Dashboard

Access the live dashboard here: [Canadian City Insights Dashboard](https://batuhanaysan.github.io/canadian-city-insights/)


## 🛠 Technologies Used

- **HTML, CSS, JavaScript**
- **Leaflet.js** – Interactive city and amenities map
- **Plotly.js** – Bubble and Radar charts
- **Chart.js** – Bar and Bar-Line charts
- **PapaParse.js** – CSV parsing in JavaScript
- **Python & Pandas** – Data cleaning and processing (Jupyter Notebooks)


## ✨ Features

- 📍 **Interactive Map:** Select a city to view amenities (hospitals, schools, supermarkets)
- 📊 **Bubble Chart:** Visualize the distribution of amenities per 100k population by city
- 📈 **Horizontal Bar Chart:** Select a city to see employment distribution across 18 sectors
- 📉 **Radar Chart:** Compare unemployment rates across cities
- 🔄 **Dropdown Selections:** Dynamic updates for maps and charts


## 📈 Key Findings

Based on the data visualizations and comparative analysis across amenities, housing affordability, and employment metrics, the following key insights were derived:

- **Healthcare Access**:  
  Winnipeg and Edmonton have the highest number of hospitals per 100,000 people, while Brampton significantly lags behind in healthcare access relative to its population size.

- **Education Access**:  
  Vancouver stands out with the highest school availability per capita, whereas Mississauga and Brampton show notably lower educational facility access.

- **Groceries Access**:  
  Hamilton, Ottawa, and Vancouver offer better access to supermarkets compared to larger cities like Toronto, where grocery store availability per capita is comparatively lower.

- **Affordability Gap**:  
  Residents of Vancouver and Toronto face the highest rental burdens relative to their average monthly income, while cities like Winnipeg and Edmonton present a more affordable cost of living.

- **Employment Stability**:  
  Calgary and Edmonton experience the highest unemployment rates among the analyzed cities, whereas Mississauga and Brampton maintain lower and more stable employment conditions.


## 📷 Dashboard Preview

![Dashboard Preview](static/img/dashboard_preview.png)


## 📂 Folder Structure

```
CANADIAN-CITY-INSIGHTS/
├── Output/
│   ├── city_amenities_data.csv
│   ├── city_rent_population.csv
│   ├── dashboard_data.csv
│   ├── employment_sectors_by_city_df.csv
│   ├── unemployment_rates_data.csv
├── Resources/          # (content hidden)
├── static/
│   ├── js/
│   │   ├── bar_line_chart.js
│   │   ├── bubble_chart.js
│   │   ├── horizontal_bar_chart.js
│   │   ├── map.js
│   │   ├── radar_chart.js
│   ├── img/
│   │   ├── mapLeaf.png
│   │   ├── dashboard_preview.png
│   ├── data/           # (copy for github pages link)
│   │   ├── city_amenities_data.csv
│   │   ├── city_rent_population.csv
│   │   ├── dashboard_data.csv
│   │   ├── employment_sectors_by_city_df.csv
│   │   ├── unemployment_rates_data.csv
│   ├── style.css
├── notebooks/
│   ├── amenities_data.ipynb
│   ├── dashboard_data.ipynb
│   ├── employment_sectors_details.ipynb
│   ├── rent_data.ipynb
├── .gitignore
├── index.html
├── README.md
```


## 🖥️ How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/batuhanaysan/canadian-city-insights.git
```

2. Navigate to the project directory:
```bash
cd canadian-city-insights
```

3. Start a local server (Python example):
```bash
python -m http.server
```

4. Open the project in your browser:
```bash
http://localhost:8000
```


## 📚 Data Sources

- [Statistics Canada](https://www.statcan.gc.ca/)
- [Rentals.ca](https://rentals.ca/)
- [ZipRecruiter - Average Salary Data](https://www.ziprecruiter.com/)
- [Geoapify API](https://www.geoapify.com/) (for amenities geolocation)

## Ethical Considerations

During the development of this project, we were careful to ensure that all data used was sourced from publicly available, open data repositories such as Statistics Canada, CMHC, and OpenStreetMap.

We strictly adhered to the terms of use and citation requirements of each dataset. No personally identifiable information (PII) was collected or processed at any stage of this project.

In visualizing city-level amenities, employment, and housing data, we acknowledged that access to resources can vary within cities and may not fully represent localized inequalities.

We also recognize that employment and housing markets are dynamic, and that our analysis reflects a snapshot in time based on the most recent data available. Users should be aware that actual conditions may differ as economic and demographic trends evolve.


## 👥 Contributors

- [Batuhan Aysan](https://github.com/BatuhanAysan)
- [Harry Grewal](https://github.com/HGrewal13)
- [Shania Thilini](https://github.com/ShaniaThilini)


## 📜 License

This project currently does not have a license.



