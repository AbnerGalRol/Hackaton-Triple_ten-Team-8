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

const RFMChartBestCustomers = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

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
      setDataLoaded(true);
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
          setDataLoaded(true);
        } catch (error) {
          console.error("Error al analizar el archivo JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const renderChart = (data) => {
    const ctx = chartRef.current.getContext("2d");
    let labels, recencyData, frequencyData, monetaryData;

    if (data.length && "customerID" in data[0]) {
      labels = data.map((customer) => `Cliente ${customer.customerID}`);
      recencyData = data.map((customer) => customer.recency);
      frequencyData = data.map((customer) => customer.frequency);
      monetaryData = data.map((customer) => customer.monetary);
    } else if (data.length && "High-Value Customer" in data[0]) {
      labels = data.map((customer) => {
        if (customer["High-Value Customer"] !== undefined) {
          return "High-Value Customer";
        } else if (customer["Potential Loyal Customer"] !== undefined) {
          return "Potential Loyal Customer";
        } else if (customer["Churn Risk Customer"] !== undefined) {
          return "Churn Risk Customer";
        }
        return "";
      });
      recencyData = data.map((customer) => customer.recency);
      frequencyData = data.map((customer) => customer.frequency);
      monetaryData = data.map((customer) => customer.monetary_value);
    } else {
      console.error("Estructura de datos no reconocida:", data);
      return;
    }

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
        indexAxis: "y",
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: "right",
          },
          title: {
            display: true,
            text: "Chart.js Horizontal Bar Chart",
          },
        },
        animation: {
          duration: 1000,
          easing: "easeOutBounce",
        },
        layout: {
          backgroundColor: "#ececec",
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
    <div className="relative z-11 flex-col items-center flex-wrap flex gap-3 mb-20 shadow-2xl py-6 px-6 bg-[#ececec]">
      {!dataLoaded && (
        <div
          className="text-center text-gray-500 relative"
          style={{ top: "200px" }}
        >
          Please load or upload data
        </div>
      )}
      <canvas
        ref={chartRef}
        id="rfmChart"
        className="w-full h-96 rfm-chart animate-flip-up"
      ></canvas>
      <button id="loadDataButton" className="relative z-11 text-[#57626d]">
        Load Data
      </button>
      <input
        className="relative z-11 text-[#57626d] cursor-pointer"
        type="file"
        id="fileInput"
      />
    </div>
  );
};

export default RFMChartBestCustomers;
