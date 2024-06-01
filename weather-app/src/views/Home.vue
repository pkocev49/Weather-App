<template>
  <section id="weatherForm">
    <weather-form @city-name="handleSearch"></weather-form>
  </section>
  <!-- <section id="currentWeather">
    <current-weather
      v-if="weatherData.length > 0"
      :currentWeatherData="weatherData"
    ></current-weather>
  </section>
  <section id="weatherForecast">
    <weather-details
      v-if="moreDetailsData.length > 0"
      :forecastData="moreDetailsData"
    ></weather-details>
  </section> -->
</template>

<script>
import CurrentWeather from '../components/CurrentWeather.vue'
import { useApi, fetchCurrentPosition } from '@/api/weather'
import { URL, URL_KEY } from '@/api/url'
import WeatherForm from '@/components/WeatherForm.vue'
import WeatherDetails from '@/components/WeatherDetails.vue'
import { ref, onMounted } from 'vue'
export default {
  components: {
    CurrentWeather,
    WeatherDetails,
    WeatherForm
  },
  setup() {
    const weatherData = ref([])
    const moreDetailsData = ref([])

    const transformData = (forecastData) => {
      const transformedForecastData = forecastData.list.map((data) => {
        const data_obj = new Date(data.dt * 1000)
        const day_name = data_obj.toLocaleDateString('en-US', { weekday: 'long' })
        return {
          ...data,
          dt: day_name
        }
      })

      const uniqueForecastData = []
      const daySet = new Set()

      transformedForecastData.forEach((data) => {
        if (!daySet.has(data.dt)) {
          daySet.add(data.dt)
          uniqueForecastData.push(data)
        }
      })
      return uniqueForecastData
    }

    const fetchForecastData = async (cityName) => {
      const forecastData = await useApi(URL, URL_KEY, null, null, null, cityName)
      if (forecastData) {
        const uniqueForecastData = transformData(forecastData)
        moreDetailsData.value = uniqueForecastData
      } else {
        moreDetailsData.value = []
      }
    }
    const fetchData = async () => {
      try {
        const position = await fetchCurrentPosition()
        const { latitude, longitude } = position.coords
        const crWeatherData = await useApi(URL, URL_KEY, null, latitude, longitude, null)
        if (crWeatherData) {
          weatherData.value = [crWeatherData]
          const cityName = crWeatherData.name
          await fetchForecastData(cityName)
        } else {
          weatherData.value = []
        }
      } catch (error) {
        console.log(error, 'error')
      }
    }

    const handleSearch = async (formData) => {
      try {
        const responseData = await useApi(URL, URL_KEY, formData.city, null, null)
        if (responseData) {
          weatherData.value = [responseData]
          moreDetailsData.value = []
          await fetchForecastData(formData.city) // Ensure this is awaited
        } else {
          weatherData.value = [] // Clear data on error
        }
        console.log(weatherData.value, 'search data')
      } catch (error) {
        console.log(error, 'error')
      }
    }

    onMounted(fetchData)
    return { weatherData, handleSearch, moreDetailsData }
  }
}
</script>
