<template>
  <form @submit.prevent="submitCityName">
    <input type="text" id="city" placeholder="Type a place " v-model.trim="city" />
    <button>Search</button>
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

<style scoped></style>
