<template>
  <div>
    <div class="btnDiv">
      <button @click="toggleShowMore" class="toggleButton">
        {{ showMore ? 'Hide Forecast\u25B2' : 'Show Forecast\u25BC' }}
      </button>
    </div>
    <div v-if="showMore" class="container">
      <div
        v-if="forecastData"
        v-for="(item, index) in forecastData"
        :key="index"
        class="secondContainer"
      >
        <div @click="toggleIsOpen(index)" class="innerContainer">
          <h3>{{ item.dt }}</h3>
          <p class="tempForecast">{{ Math.round(item.main.temp) }}°C</p>
        </div>
        <div v-if="isOpen[index]" class="moreDataContainer">
          <div class="innerContainerTwo">
            <p class="customP">Humidity:</p>
            <v-progress-circular
              :model-value="item.main.humidity"
              :rotate="360"
              :size="60"
              :width="8"
              color="blue"
              class="progress"
            >
              {{ item.main.humidity }}%
            </v-progress-circular>
            <p class="customP">Cloudiness:</p>
            <v-progress-circular
              :model-value="item.clouds.all"
              :rotate="360"
              :size="60"
              :width="8"
              color="blue"
              class="progress"
            >
              {{ item.clouds.all }}%
            </v-progress-circular>

            <p class="customP">Wind Speed:</p>
            <v-progress-circular
              :model-value="item.wind.speed"
              :rotate="360"
              :size="60"
              :width="8"
              color="blue"
              class="progress"
            >
              {{ Math.round(item.wind.speed) }} m/s
            </v-progress-circular>
            <p>Weather: {{ item.weather[0].description }}</p>
            <img class="weatherImage" :src="weatherIconUrl" alt="weatherImage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, computed } from 'vue'
import { VProgressCircular } from 'vuetify/lib/components/index.mjs'

export default {
  components: {
    VProgressCircular
  },
  props: {
    forecastData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const { forecastData } = toRefs(props)
    console.log(forecastData.value, 'data from more details')
    const isOpen = ref(new Array(props.forecastData.length).fill(false))
    const showMore = ref(false)
    const toggleIsOpen = (index) => {
      isOpen.value[index] = !isOpen.value[index]
    }
    const toggleShowMore = () => {
      showMore.value = !showMore.value
    }
    const weatherIconUrl = computed(() => {
      if (forecastData.value.length > 0) {
        return `https://openweathermap.org/img/wn/${forecastData.value[0].weather[0].icon}.png`
      }
    })
    return {
      forecastData,
      isOpen,
      toggleIsOpen,
      showMore,
      toggleShowMore,
      weatherIconUrl
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  padding: 20px;
  background: linear-gradient(to bottom right, #004e92, #000428);
  border-radius: 15px;
  width: 100%;
}
.secondContainer {
  width: 100%;
  max-width: 800px;
}

.moreDataContainer {
  padding: 20px;
  border: 3px solid #b3e5fc;
  border-radius: 15px;
  width: 100%;
  margin-bottom: 10px;
  background-color: transparent;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: moveDown 0.5s;
  max-width: 800px;
}

.innerContainer {
  padding: 20px;
  border: 3px solid #0288d1;
  border-radius: 15px;
  width: 100%;
  margin-bottom: 20px;
  animation: moveDown 0.5s forwards;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.innerContainerTwo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

@keyframes moveDown {
  0% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0);
  }
}

@media screen and (min-width: 800px) {
  .innerContainerTwo {
    flex-direction: row;
  }
}

button {
  background-color: #0288d1;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0277bd;
}

.btnDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.toggleButton {
  background-color: #0288d1;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggleButton:hover {
  background-color: #0277bd;
}

p {
  color: white;
  margin-bottom: 10px;
}

.tempForecast {
  color: #000428;
}

.progress {
  transition: stroke-dashoffset 1s ease-in-out;
}

.weather-icon {
  font-size: 2em;
  color: white;
}

.weatherInfo,
.windSpeedInfo {
  display: flex;
  align-items: center;
}

.customP {
  margin-right: 10px;
}
.weatherImage {
  width: 100px;
  height: 100px;
}
</style>
