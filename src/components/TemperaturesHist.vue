<script setup lang="ts">
import { ref } from 'vue';
import TemperatureService from '../utils/crudTemperatures';

interface Temperature {
    date: string;
    degres: number;
}

const temperatures = ref<Temperature[]>([]);

const trierParDate = () => {
    temperatures.value.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const trierParTemperature = () => {
    temperatures.value.sort((a, b) => a.degres - b.degres);
};

const recupererTemperatures = () => {
    temperatures.value = TemperatureService.recupererTemperatures();
};
recupererTemperatures();
</script>

<template>
    <div>
        <button @click="trierParDate">Trier par date</button>
        <button @click="trierParTemperature">Trier par température</button>
        <ul class="centered">
            <li v-for="(temperature, index) in temperatures" :key="index">
                <div id="enregistrement1">{{ temperature.date }}</div> 
                <div id="enregistrement2">{{ temperature.degres }}°C </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.centered {
    display: flex;
    justify-content: center;
    height: 100vh; 
}

ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: start;
    padding: 0;
    width: 100%;
}

li {
    list-style: none;
    padding: 10px;
    margin: 1px; /* adjust as needed */
    background-color: lightblue;
    color: darkblue;
    border: 1px solid black;
    border-radius: 10px;
}
</style>
