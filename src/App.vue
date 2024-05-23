<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
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
  <RouterView />
</template>

<style scoped>
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
