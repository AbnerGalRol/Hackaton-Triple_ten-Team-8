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

const RFMChartProducts = () => {
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

    // Verificar que la estructura del JSON sea la esperada
    if (
      !Array.isArray(data) ||
      !data.every((item) => "Amount of sales" in item)
    ) {
      console.error("Estructura de datos no reconocida o incorrecta:", data);
      return;
    }

    const labels = data.map((item) => Object.keys(item)[0]);
    const salesData = data.map((item) => item["Amount of sales"]);

    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChartInstance = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Amount of Sales",
            data: salesData,
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

        aspectRatio: 2,

        plugins: {
          legend: {
            position: "right",
          },
          title: {
            display: true,
            text: "Sales Data Chart",
          },
        },
        animation: {
          duration: 1000,
          easing: "easeOutBounce",
        },
        layout: {
          padding: {
            right: 100,
            left: 50,
          },
        },
        scales: {
          y: {
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
            },
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

export default RFMChartProducts;
