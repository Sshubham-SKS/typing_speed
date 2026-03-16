import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const ChartBox = ({ type, data, labels, color, gradientStart, label }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: label || (type === 'line' ? 'Speed (WPM)' : 'Accuracy (%)'),
        data: data,
        borderColor: color,
        backgroundColor: type === 'line' ? (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, gradientStart || color);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          return gradient;
        } : color,
        borderWidth: 2,
        fill: type === 'line',
        tension: 0.4,
        borderRadius: type === 'bar' ? 4 : 0,
        pointBackgroundColor: color,
        pointBorderColor: '#1e293b', // slate-800
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.9)', // slate-800
        titleColor: '#f8fafc',
        bodyColor: '#f8fafc',
        borderColor: 'rgba(51, 65, 85, 0.5)', // slate-700
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8', // slate-400
          font: { family: "'Inter', sans-serif" }
        }
      },
      y: {
        grid: {
          color: 'rgba(51, 65, 85, 0.3)', // slate-700
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: { family: "'Inter', sans-serif" }
        },
        suggestedMin: 0,
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  if (type === 'line') return <Line data={chartData} options={options} />;
  return <Bar data={chartData} options={options} />;
};

export default ChartBox;
