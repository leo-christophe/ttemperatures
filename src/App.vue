<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
var estConnecte = true
const mdp = ref()

</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Formulaire</RouterLink>
        <RouterLink to="/statistiques">Statistiques</RouterLink>
        <RouterLink to="/export">Import/Export</RouterLink>
      </nav>
  </header>
  <div id="vide"></div>
  <RouterView v-if="estConnecte"/>
  <div v-else class="card flex flex-wrap gap-3">
    Veuillez vous connecter
    <form >
      <div class="flex-auto formulaireConnexion">
        <Floatlabel for="motdepasse" value="Mot de passe">
          <InputText v-model="mdp" id="motdepasse" :class="{'p-invalid': !mdp}" />
          <label ></label>
        </Floatlabel>
        <Button label="Submit"></Button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.formulaireConnexion{
  margin-top:100px;
}
  #vide{
  height:100px;
  }

  header {
    background-color: black;
    color: white;
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    z-index: 1000; /* Pour être sûr que le header reste au-dessus du contenu */
    
  }

  nav {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  nav a {
    color: white;
    text-decoration: none;
    margin: 0 1rem;
    font-weight: normal;
  }

  nav a:hover {
    size:120%;
    transition:all 2s ease-in;
  }
</style>
