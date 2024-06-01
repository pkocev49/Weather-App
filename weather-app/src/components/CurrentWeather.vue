<template>
  <div v-if="!currentWeatherData || currentWeatherData.length === 0">
    <p>No weather data available. Please try a different city.</p>
  </div>
  <div v-for="location in currentWeatherData" :key="location.name">
    <h2>{{ location.name }}</h2>
    <p>{{ location.weather[0].description }}</p>
    <img :src="weatherIconUrl" alt="weatherImg" />
    <p>Temperature: {{ location.main.temp }}°C</p>
    <p>Humidity: {{ location.main.humidity }}%</p>
  </div>
</template>

<script>
import { computed, toRefs, watch } from 'vue'

export default {
  props: {
    currentWeatherData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const { currentWeatherData } = toRefs(props)
    console.log(currentWeatherData.value)
    watch(
      currentWeatherData,
      (newValue) => {
        console.log(newValue, 'current weather data')
      },
      { immediate: true }
    )
    const weatherIconUrl = computed(() => {
      if (currentWeatherData.value.length > 0) {
        return `https://openweathermap.org/img/wn/${currentWeatherData.value[0].weather[0].icon}.png`
      }
    })

    return { currentWeatherData, weatherIconUrl }
  }
}
</script>
