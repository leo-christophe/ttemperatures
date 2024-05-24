import { ref } from 'vue';

interface Temperature {
    date: string;
    degres: number;
}

class TemperatureService {
    static sauvegarderTemperature(degres: number, date: Date = new Date()): void {
        const dateFormattee = date.toLocaleString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Préparer l'objet température
        const temperature: Temperature = {
            date: dateFormattee,
            degres: degres
        };

        // Convertir l'objet en JSON et sauvegarder
        localStorage.setItem(dateFormattee, JSON.stringify(temperature));
    }

    static lireTemperature(date: string): Temperature | null {
        const temperatureString = localStorage.getItem(date);
        if (temperatureString !== null) {
            return JSON.parse(temperatureString);
        }

        return null;
    }

    static recupererTemperatures(): Temperature[] {
        const temperatures: Temperature[] = [];

        // Parcourir le localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key !== null) {
                const temperatureString = localStorage.getItem(key);
                if (temperatureString !== null) {
                    const temperature: Temperature = JSON.parse(temperatureString);
                    temperatures.push(temperature);
                }
            }
        }

        return temperatures;
    }

    static supprimerTemperature(id: number): Boolean | null {
        const key = localStorage.key(id);
        if (key === null) {
            return null;
        }
        localStorage.removeItem(key);
        if (localStorage.getItem(key) == null){
            return true;
        } else {
            return false;
        }
    }
}

export default TemperatureService;
