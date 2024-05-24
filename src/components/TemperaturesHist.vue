<script setup lang="ts">
import Button from 'primevue/button'
import { ref } from 'vue';
import TemperatureService from '../utils/crudTemperatures';

interface Temperature {
    date: string;
    degres: number;
    id: number; // Assurez-vous que chaque température a un identifiant unique
}

const temperatures = ref<Temperature[]>([]);

const trierParDate = () => {
    temperatures.value.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const trierParTemperature = () => {
    temperatures.value.sort((a, b) => a.degres - b.degres);
};

const recupererTemperatures = () => {
    temperatures.value = TemperatureService.recupererTemperatures().map((temp, index) => ({ ...temp, id: index + 1 }));
};
recupererTemperatures();

const deleteTemp = (id: number) => {
    TemperatureService.supprimerTemperature(id);
    // Mise à jour de la liste après suppression
    temperatures.value = TemperatureService.recupererTemperatures().map((temp, index) => ({ ...temp, id: index + 1 }));
};
</script>

<template>
    <div class="centered">
        <Button class="tri" @click="trierParDate" icon="pi-calendar-plus">Trier par date</Button>
        <Button class="tri" @click="trierParTemperature" icon="pi-calendar-plus">Trier par température</Button>

        <ul>
            
            <li v-for="(item, index) in temperatures">
                <div id="enregistrement1">{{ item.date }}</div>
                <div id="enregistrement2">{{ item.degres }}°C</div>
                <button type="button" @click="deleteTemp(index)">🗑️</button>

            </li>
        </ul>
    </div>
</template>

<style scoped>
.tri{
    width:300px;
    background-color:rgb(162, 221, 162);
    border: 1px solid green;
    color:black;
    text-align:center;
    display:block;
    height:70px;
    justify-content: center;
}

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
    margin-top:200px;
}

li {
    list-style: none;
    padding: 10px;
    margin: 1px; /* ajustez si nécessaire */
    background-color: lightblue;
    color: darkblue;
    border: 1px solid black;
    border-radius: 10px;
}
</style>
