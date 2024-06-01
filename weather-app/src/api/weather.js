export async function useApi(URL, URLKEY, city = null, lat = null, lon = null, forecastCity = null) {
    let apiUrl
    try {
        if (city !== null) {
            apiUrl = `${URL}weather?q=${city}&units=metric&exclude=minutely&appid=${URLKEY}`
        } else if (lat !== null && lon !== null) {
            apiUrl = `${URL}weather?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${URLKEY}`
        } else if (forecastCity !== null) {
            apiUrl = `${URL}forecast?q=${forecastCity}&units=metric&appid=${URLKEY}`;
        } else {
            throw new Error('PLEASE ENTER A CITY OR CORDINATES!')
        }

        const response = await fetch(apiUrl)

        if (!response.ok) {
            throw new Error('Network response was not ok!')
        }
        const respondeData = await response.json()
        return respondeData

    } catch (error) {
        console.error('Fetch error:', error);
        return null
    }

}

export function fetchCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })

}