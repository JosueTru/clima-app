import { useState, useEffect } from 'react'
import './App.css'


const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&lang=es&q=`;




function App(props) {
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
 
  const [errorx, setErrorx] = useState({
    error: false,
    msg: ""
  })


  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temp: "",
    icon: ""
  })

  useEffect(()=>{
    console.log("render")
  }, [])


  const onSubmit = async (e) => {



    try {
      


      if (!city.trim())  { setErrorx({
        error: true,
        msg: "Completa este campo"
      }) 
      e.preventDefault();
    } else {
        setErrorx({
          error: false,
          msg: "ta bien"
        })
        
      }

     


      const response = await fetch("http://api.weatherapi.com/v1/current.json?key=d6611612e27843d59f040736230907&lang=es&q=" + city + "&aqi=no")
      const data = await response.json();

      //console.log("http://api.weatherapi.com/v1/current.json?key=1e64cf691a4b46dfb9144720232305&lang=es&q=" + city + "%20" + country)

      

      //console.log(errorx)

      if (data.error) throw { message: data.error.message }

      console.log(weather.icon)



      setWeather({
        city: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c + "°C",
        region: data.location.region,
        icon: data.current.condition.icon,
        precipit: "",
      })

      if (!city.trim()) {
        
      }

    } catch (error) {
      console.log(error)

    }

  }

  return (
    <div className='container d-flex justify-content-center align-items-center animate__animated animate__fadeInUp'>
      <h1 className="display-1 mb-5 fw-normal"  >Wheather</h1>
      <div className="col-8">
        <form action="#" className="row g-0" >
          <div className="form-floating mb-3">




            {/* INPUT DE LA CIUDAD */}
            <input type="text" className="form-control" id="floatingInput" placeholder="Ciudad" onChange={(e) => setCity(e.target.value)} />

            <label htmlFor="floatingInput">Write a country or city.</label>

            {errorx.error ? <p className='warning ms-2 mt-2'>{errorx.msg}</p> : " " }
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-primary" type='submit' onClick={onSubmit} >Search</button>
          </div>
        </form>
      </div>


      
      <div className="textos d-flex p-4 col-2 align-items-center justify-content-center ">
        
        <h2 className='ms-3'>{weather.country}</h2>


        <h4 className='ms-3'>{weather.city}</h4>

        <img className='ms-3'  src={weather.icon} class="img-fluid" alt=""/>


        <h2 className='ms-3'>{weather.temp}</h2>
      
      </div>




      <p className='mt-2'>Powered by: <a href="https://www.weatherapi.com/" title='Wheather API'>WeatherApi.com</a> </p>




    </div>





  )
}

export default App

















/*
FETCH A LA ANTIGUA :

fetch("http://api.weatherapi.com/v1/current.json?key=1e64cf691a4b46dfb9144720232305&lang=es&q=london")
.then( res => res.json())
.then( data => console.log(data))
*/
