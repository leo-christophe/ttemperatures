<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TemperatureService from '../utils/crudTemperatures';
import barGraph from '@/components/barGraph.vue';
import barChart from '@/components/barChart.vue';
const temp = ref<number | null>(null);
const result = ref<string>("");
const temperatures = ref<Temperature[]>([]); // Déclarer un état pour les températures

interface Temperature {
    date: string;
    degres: number;
}

// Fonction pour charger les températures
function loadTemperatures() {
    temperatures.value = TemperatureService.recupererTemperatures();
}

// Charger les températures lors du montage du composant
onMounted(() => {
    loadTemperatures();
});
</script>
<template>
    <select name="temps">
        <option>Températures Enregistrées</option>
        <option disabled value="{{ temperature.degres }}" v-for="(temperature, index) in temperatures" :key="index">
            {{ temperature.date }} : {{ temperature.degres }}°C
        </option>
    </select>
    <barGraph></barGraph>
    <barChart></barChart>
</template>

<style scoped>
/* Ajoute ton style ici si nécessaire */
</style>
