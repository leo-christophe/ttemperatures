<script lang="ts">
import { defineComponent } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

import { ref, onMounted } from 'vue';

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

export default defineComponent({
  name: 'Home',
  components: { BarChart },
  setup() {
    const testData = ref<ChartData>({
      labels: [],
      datasets: [{ data: [], backgroundColor: [] }],
    });

    onMounted(() => {
      const currentDate = new Date();
      const currentDay = currentDate.getDay();
      const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
      const currentWeekDates = [];

      for (let i = 1; i <= 7; i++) {
        const dayIndex = (currentDay + i) % 7;
        currentWeekDates.push(daysOfWeek[dayIndex]);
      }

      const degrees: number[] = []; // Array to store the average degrees for each day

      currentWeekDates.forEach((day) => {
        const storedData = localStorage.getItem(day);
        if (storedData) {
          const temperatures = JSON.parse(storedData);
          const averageDegree = temperatures.reduce((sum: any, degree: any) => sum + degree, 0) / temperatures.length;
          degrees.push(averageDegree);
        } else {
          degrees.push(0); // If no data is stored for a day, assume average degree as 0
        }
      });

      testData.value = {
        labels: currentWeekDates,
        datasets: [
          {
            data: degrees,
            backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED', '#A5C8ED','#A5C8ED'],
          },
        ],
      };
    });

    return { testData };
  },
});
</script>
