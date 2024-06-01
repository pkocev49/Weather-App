<template>
  <div>
    <h2>Weather Forecast</h2>
    <div v-if="forecastData" v-for="(item, index) in forecastData" :key="index">
      <h3>{{ item.dt }}</h3>
      <button @click="toggleIsOpen(index)">Show</button>

      <div v-if="isOpen[index]">
        <p>Temperature: {{ item.main.temp }}°C</p>
        <p>Humidity: {{ item.main.humidity }}%</p>
        <p>Weather: {{ item.weather[0].description }}</p>
        <p>Cloudiness: {{ item.clouds.all }}%</p>
        <p>Wind Speed: {{ item.wind.speed }} m/s</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from 'vue'

export default {
  props: {
    forecastData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const { forecastData } = toRefs(props)

    // Create a reactive reference to store the open/close state of each weather forecast item
    const isOpen = ref(
      // Create a new array with a length equal to the number of weather forecast items
      new Array(props.forecastData.length)
        // Fill each element of the array with the value 'false'
        // This indicates that initially, all forecast items are closed (not shown)
        .fill(false)
    )
    const toggleIsOpen = (index) => {
      isOpen.value[index] = !isOpen.value[index]
    }

    return {
      forecastData,
      isOpen,
      toggleIsOpen
    }
  }
}
</script>
