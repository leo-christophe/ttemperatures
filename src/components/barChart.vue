<script setup lang="ts">
import { ref, onMounted } from 'vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BarChart as Bar } from 'vue-chart-3';
import axios from 'axios';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Define interfaces
interface Temperature {
  date: Date;
  temperature: number;
}

interface RealTemperature {
  date: string;
  temperature: number;
}

// Function to get color based on temperature
function getColorForTemperature(temp: number): string {
  if (temp <= 0) return 'purple';
  if (temp <= 10) return 'blue';
  if (temp <= 20) return 'yellow';
  if (temp <= 30) return 'orange';
  return 'red';
}

// Function to retrieve temperatures from local storage
function getStoredTemperatures(): Temperature[] {
  const storedData = localStorage.getItem('temperatures');
  if (!storedData) return [];
  return JSON.parse(storedData).map((temp: any) => ({
    ...temp,
    date: new Date(temp.date)
  }));
}

// Function to get dates of the current week starting from Monday
function getNextWeekDates(): Date[] {
  const dates = [];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const mondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; // Adjust for Sunday being 0

  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    dates.push(date);
  }

  return dates;
}

// Function to fetch monthly temperatures from API
async function fetchMonthlyTemperatures(city: string) {
  const apiKey = '19b27f8ef3344483a44215904242205'; // Replace with your actual API key
  const currentYear = new Date().getFullYear();
  const monthlyTemps = [];

  for (let month = 1; month <= 12; month++) {
    const monthStr = month.toString().padStart(2, '0');
    const date = `${currentYear}-${monthStr}-01`;
    const url = `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${date}`;

    try {
      const response = await axios.get(url);
      const avgTemp = response.data.forecast.forecastday[0].day.avgtemp_c;
      monthlyTemps.push({ month, temperature: avgTemp });
    } catch (error) {
      console.error(`Error fetching monthly temperature for ${date}:`, error);
    }
  }

  return monthlyTemps;
}

const monthRealTemps = ref<{ month: number, temperature: number }[]>([]);

onMounted(async () => {
  const city = 'Scionzier'; // Replace with desired city
  await fetchRealTemperatures(city);
  monthRealTemps.value = await fetchMonthlyTemperatures(city);
});

// Organize temperatures for the week
const storedTemperatures = ref<Temperature[]>(getStoredTemperatures());
const weekDates = ref<Date[]>(getNextWeekDates());
const weekGeneratedTemps = ref<Temperature[]>(weekDates.value.map(date => {
  const temp = storedTemperatures.value.find(temp => temp.date.toDateString() === date.toDateString());
  return {
    date,
    temperature: temp ? temp.temperature : 0 // Replace 0 with default value
  };
}));

const weekRealTemps = ref<RealTemperature[]>([]);

// Function to export current page to PDF
const exportToPDF = async () => {
  const element = document.body; // Capture entire page body

  // Use html2canvas to capture page content
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  
  // Create PDF document with jsPDF
  const pdf = new jsPDF();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
  // Add captured image to PDF
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
  // Save the PDF
  pdf.save('page.pdf');
};

// Chart options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const // Force literal type
    },
    title: {
      display: true,
      text: 'Comparaison des températures de la semaine actuelle'
    }
  }
};

// Function to fetch real temperatures for the week from API
async function fetchRealTemperatures(city: string) {
  const apiKey = '19b27f8ef3344483a44215904242205'; // Replace with your actual API key
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in yyyy-MM-dd format
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&dt=${currentDate}`;

  const response = await axios.get(url);
  const forecastDays = response.data.forecast.forecastday;

  weekRealTemps.value = forecastDays.map((day: any) => ({
    date: day.date,
    temperature: day.day.avgtemp_c
  }));
}

// Fetch real temperatures for the week when component mounts
onMounted(async () => {
  const city = 'Scionzier'; // Replace with desired city
  await fetchRealTemperatures(city);
});
</script>

<template>
  <button @click="exportToPDF">Exporter en PDF</button>
  <div id="content">
    <div>
      <h2>Semaine actuelle</h2>
      <Bar
        :chartData="{
          labels: weekDates.map(date => date.toLocaleDateString('fr-FR', { weekday: 'long' })),
          datasets: [
            {
              label: 'Températures générées',
              backgroundColor: weekGeneratedTemps.map(temp => getColorForTemperature(temp.temperature)),
              data: weekGeneratedTemps.map(temp => temp.temperature)
            },
            {
              label: 'Températures réelles',
              backgroundColor: 'red', // Uniform red for all real bars
              data: weekRealTemps.map(temp => temp.temperature)
            }
          ]
        }"
        :options="chartOptions"
      />
    </div>
    <div>
      <h2>Températures moyennes mensuelles</h2>
      <Bar
        :chartData="{
          labels: monthRealTemps.map(temp => new Date(2020, temp.month - 1).toLocaleDateString('fr-FR', { month: 'long' })),
          datasets: [
            {
              label: 'Températures moyennes mensuelles',
              backgroundColor: monthRealTemps.map(temp => getColorForTemperature(temp.temperature)),
              data: monthRealTemps.map(temp => temp.temperature)
            }
          ]
        }"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<style scoped>
/* Add necessary styles here */
</style>
