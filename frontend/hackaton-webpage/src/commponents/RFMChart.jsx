import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RFMChart = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const loadData = async () => {
    try {
      const response = await fetch("/rfmData.json");

      if (!response.ok) {
        throw new Error(
          `Error en la respuesta del servidor: ${response.statusText}`
        );
      }
      const jsonData = await response.json();
      renderChart(jsonData);
    } catch (error) {
      console.error("Error al cargar los datos JSON:", error);
    }
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          renderChart(data);
        } catch (error) {
          console.error("Error al analizar el archivo JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const renderChart = (rfmData) => {
    const ctx = chartRef.current.getContext("2d");
    const labels = rfmData.map((customer) => `Cliente ${customer.customerID}`);
    const recencyData = rfmData.map((customer) => customer.recency);
    const frequencyData = rfmData.map((customer) => customer.frequency);
    const monetaryData = rfmData.map((customer) => customer.monetary);

    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChartInstance = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Recency",
            data: recencyData,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Frequency",
            data: frequencyData,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Monetary",
            data: monetaryData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setChartInstance(newChartInstance);
  };

  useEffect(() => {
    const fileInput = document.getElementById("fileInput");
    const loadDataButton = document.getElementById("loadDataButton");

    fileInput.addEventListener("change", handleFileUpload);
    loadDataButton.addEventListener("click", loadData);

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
      fileInput.removeEventListener("change", handleFileUpload);
      loadDataButton.removeEventListener("click", loadData);
    };
  }, [chartInstance]);

  return (
    <div>
      <input type="file" id="fileInput" />
      <button id="loadDataButton" className="z-4">
        Load Data
      </button>
      <canvas ref={chartRef} id="rfmChart" className="relative z-3"></canvas>
    </div>
  );
};

export default RFMChart;
