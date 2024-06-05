<template>
  <div v-for="location in currentWeatherData" :key="location.name" class="weatherContainer">
    <div class="firstDiv">
      <img class="weatherImg" :src="weatherIconUrl" alt="weather icon" />
    </div>
    <div class="secondDiv">
      <p class="temp">{{ Math.round(location.main.temp) }}°C</p>
      <p class="weatherDesc">{{ location.weather[0].description }}</p>
      <span class="nameSpan">{{ location.name }}</span>
      <div class="secondContainer">
        <div class="thirdDiv">
          <img src="../assets/icons/humidity-svgrepo-com.svg" alt="humidity icon" />
          <div>
            <p class="humidity">{{ location.main.humidity }}%</p>
            <span class="costumeSpan">Humidity</span>
          </div>
        </div>
        <div class="thirdDiv">
          <img class="windImg" src="../assets/icons/wind-speed-7.svg" alt="wind speed icon" />
          <div>
            <p class="windSpeed">{{ Math.round(location.wind.speed) }}Km/h</p>
            <span class="costumeSpan">Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
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

<style scoped>
.weatherContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
}

.secondContainer {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}

.secondDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.thirdDiv {
  display: flex;
  flex-direction: row;
  align-items: center;
}

@media screen and (min-width: 720px) {
  .weatherImg {
    width: 200px !important;
    height: 200px !important;
    margin-bottom: 0;
  }
}

.weatherImg {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}
.temp {
  font-size: 55px;
  color: #0288d1;
  margin-bottom: 5px;
}
.weatherDesc {
  margin-bottom: 15px;
  font-style: italic;
  color: white;
}

.humidity {
  margin-right: 10px;
  color: white;
}
.nameSpan {
  color: white;
}
.costumeSpan {
  font-size: 12px;
  color: white;
}
.windImg {
  width: 38px;
  height: 38px;
  margin-right: 5px;
}
.windSpeed {
  color: white;
}
.noDataContainer {
  text-align: center;
  margin-top: 50px;
  font-size: 20px;
}
</style>
