import jsonp from '@/common/js/jsonp'
// import axios from 'axios'

export function getWeather(city) {
  const url = 'http://wthrcdn.etouch.cn/weather_mini'
  const data = {
    city: city
  }
  const options = {
    type: "GET",
    dataType: "json"
  }
  return jsonp(url, data, options)
}
