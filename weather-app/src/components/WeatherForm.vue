<template>
  <form @submit.prevent="submitCityName" class="weatherForm">
    <input type="text" id="city" placeholder="Type a place " v-model.trim="city" />
    <button><img src="../assets/icons/icons8-search.svg" alt="search icon" /></button>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup(_, { emit }) {
    const city = ref('')

    function submitCityName() {
      const formData = { city: city.value }
      city.value = ''
      emit('city-name', formData)
    }
    return { city, submitCityName }
  }
}
</script>

<style scoped>
.weatherForm {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.weatherForm input {
  padding: 10px;
  border-radius: 50px;
  border: 1px solid gray;
  width: 100%;
  margin-right: 10px;
}
.weatherForm button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

@media screen and (min-width: 480px) {
  .weatherForm input {
    width: 500px;
  }
}
</style>
