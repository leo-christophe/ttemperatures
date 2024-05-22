import { ref } from 'vue';

export interface Temperature {
    temperature: number;
    date?: Date;
}

export const temperatures = ref<Temperature[]>([]);

export function addTemperature(temperature: number, date?: Date) {
    temperatures.value.push({ temperature, date });
}
