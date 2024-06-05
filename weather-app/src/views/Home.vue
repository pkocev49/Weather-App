<template>
  <div v-if="isLoading">
    <base-loader></base-loader>
  </div>
  <div v-else>
    <img src="../assets/icons/1530388_weather_christmas_snow_snowflake_winter_icon.svg" alt="" />
    <section id="weatherForm">
      <weather-form @city-name="handleSearch"></weather-form>
    </section>
    <section id="currentWeather">
      <p v-if="error">{{ errorMessage }}</p>
      <current-weather v-else :currentWeatherData="weatherData"></current-weather>
    </section>
    <section id="weatherForecast" v-if="weatherData && weatherData.length > 0">
      <weather-details :forecastData="moreDetailsData"></weather-details>
    </section>
  </div>
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
    const error = ref(false)
    const errorMessage = ref('')
    const isLoading = ref(true)

    // Function to transform the forecast data to display unique days
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

    const handleError = (message) => {
      moreDetailsData.value = []
      error.value = true
      errorMessage.value = message
      isLoading.value = false
    }

    // Function to fetch the forecast data for a given city
    const fetchForecastData = async (cityName) => {
      try {
        const forecastData = await useApi(URL, URL_KEY, null, null, null, cityName)
        if (forecastData) {
          moreDetailsData.value = transformData(forecastData)
          error.value = false
        } else {
          handleError('The place that you entered does not exist')
        }
      } catch (err) {
        handleError('Failed to fetch forecast data')
      } finally {
        isLoading.value = false
      }
    }

    // Function to fetch the current weather data based on user's position
    const fetchData = async () => {
      try {
        const position = await fetchCurrentPosition()
        const { latitude, longitude } = position.coords
        const currentWeatherData = await useApi(URL, URL_KEY, null, latitude, longitude, null)

        weatherData.value = []

        if (currentWeatherData) {
          weatherData.value = [currentWeatherData]
          await fetchForecastData(currentWeatherData.name)
        } else {
          handleError('The place that you entered does not exist')
        }
      } catch (error) {
        handleError('Failed to fetch weather data')
      } finally {
        isLoading.value = false
      }
    }

    // Function to handle search input and fetch weather data for the entered city
    const handleSearch = async (formData) => {
      try {
        const responseData = await useApi(URL, URL_KEY, formData.city, null, null)
        weatherData.value = []
        if (responseData) {
          weatherData.value = [responseData]
          await fetchForecastData(formData.city)
        } else {
          handleError('The place that you entered does not exist')
        }
      } catch (error) {
        handleError('Failed to fetch weather data for the entered city')
      } finally {
        isLoading.value = false
      }
    }

    onMounted(fetchData)
    return { weatherData, handleSearch, moreDetailsData, error, errorMessage, isLoading }
  }
}
</script>

<style scoped>
img {
  width: 70px;
  height: 70px;
}
p {
  text-align: center;
  color: white;
}
</style>
