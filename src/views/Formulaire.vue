<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import TemperatureService from '../utils/crudTemperatures';
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Floatlabel from 'primevue/floatlabel';
import TemperaturesHist from '@/components/TemperaturesHist.vue';
import { temperatures, addTemperature } from '../utils/temperatureState';
import type { Temperature } from '../utils/temperatureState';  // Utilisation de `import type` pour les types

const temp = ref<number | null>(null);
const datetime24h = ref<Date>(new Date());
const toast = useToast();

// Gestionnaire d'événement pour le formulaire
function submitForm() {
    if (temp.value !== null) {
        addTemperature(temp.value, datetime24h.value);

        // Sauvegarder la température
        TemperatureService.sauvegarderTemperature(temp.value, datetime24h.value);
        temperatures.value.forEach((temperature, index) => {
            if (temperature.temperature == temp.value) {
                temperatures.value[index].temperature = temp.value;
            }
        });
        // Afficher un message de confirmation
        show();
    }
}

const show = () => {
    toast.add({
        severity: 'success',
        summary: 'Température enregistrée avec succès!',
        life: 2500
    });
}

// Fonctions de tri
function sortByDate() {
    temperatures.value.sort((a: Temperature, b: Temperature) => {
        if (a.date && b.date) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (a.date) {
            return -1;
        } else if (b.date) {
            return 1;
        } else {
            return 0;
        }
    });
}

function sortByTemperature() {
    temperatures.value.sort((a: Temperature, b: Temperature) => a.temperature - b.temperature);
}
</script>

<template>
    <h1>Enregistrer Températures</h1>
    <form id="form-temperature" @submit.prevent="submitForm">
        <div class="formElements  card flex flex-wrap gap-3">
            <div id="temperatureinput" class="flex-auto">
                <Floatlabel>
                    <label for="temperature" class="font-bold block mb-2">Température (°C):</label>
                    <InputNumber v-model.number="temp" id="temperature" name="temperature" required inputId="integeronly" />
                </Floatlabel>
            </div>

            <div class="flex-auto" id="calendarinput">
                <Floatlabel>
                    <label for="calendar-24h" class="font-bold block mb-2">Date (Optionnel):</label>
                    <Calendar id="calendar-24h" v-model="datetime24h" showTime hourFormat="24" />
                </Floatlabel>
            </div>

            <Button type="submit"><div>Sauvegarder</div></Button>
        </div>
    </form>


    <TemperaturesHist></TemperaturesHist>

    <div class="card flex justify-content-center">
        <Toast />
    </div>
</template>

<style scoped>
#form-temperature {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

#calendarinput {
    margin-top: 20px;
    margin-bottom: 20px;
}

.formElements {
    display: flex;
    flex-direction: column;
}

.formElements Button {
    width: 200px;
}

.formElements .p-button {
    justify-content: center;
}

#temperatureinput {
    margin-top: 20px;
    margin-bottom: 20px;
}

.sort-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
}

.temperature-list {
    margin: 20px 0;
}

.temperature-list ul {
    list-style-type: none;
    padding: 0;
}

.temperature-list li {
    margin: 5px 0;
}
</style>
