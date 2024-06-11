import { useState } from 'react'
import './App.css'
import { useFetchDisney } from './useFetchDisney'
import logoDisney from './assets/logo_disney.png'
import lupa from './assets/lupa.png'
import logoDisney2 from './assets/logo_disney2.png'

function App() {
  
  const url1 = 'https://api.disneyapi.dev/character'

  const [url, setUrl] = useState(url1)

  function obtenerValor() {
    var input = document.getElementById('input-busqueda');

    // Verificar si el input es null o undefined
    if (input) {
        // Obtener el valor del input
        
        var valor = input.value;
  
        var url2 = `https://api.disneyapi.dev/character?name=${valor}`
        setUrl(url2)
    } else {
        alert('Inserta un Personaje de Disney')
    }
    
  }

  const { data } = useFetchDisney(url)

  return (
    <>
      <div className='encabezado'>
        <img src={logoDisney2} alt="" width={170} height={70} />         
        <div className='contenidoBuscador'>
          <img className='iconoBuscar' src={lupa} alt="" />
          <input type="text" id='input-busqueda' name='busqueda' placeholder='Buscar por artista o evento' />
          <button type='button' className='btnBuscar' onClick={obtenerValor}>Buscar</button>
        </div> 
      </div>

      <div className='contenidoPrincipal'>
        <>
          {data?.map((personaje) => (
            
            personaje.imageUrl && (
              <div key={personaje.id} className='card'>
              <div className='front'>
                <div className="contentCard">  
                  <div className='contentImg'>
                    <img src={personaje.imageUrl} className='imgPersonaje' alt="" />
                  </div>
                  <div className='infoFront'>
                    
                    <h3 className='nombrePersonaje'>{personaje.name}</h3>
                    <div className='lineaTitulo'></div>
                    {personaje.films?.map((pelis, idx) => idx < 1 && (
                        <li key={pelis} className='peliTitular'>{pelis}</li>
                      ))}
                  </div>
                  </div>
                </div>

              <div className='back'>
                <div className="contentCard">
                  
                  <img src={logoDisney} alt="" width={230} height={130} />
                  <ul>
                    {personaje.films != '' ? personaje.tvShows != '' ?<h2>Películas y TV Shows</h2> : <h2>Películas</h2> : personaje.tvShows != '' ? <h2>Tv Shows</h2> : ''}
                    {/*personaje.films != '' || personaje.tvShows != '' ? <h2>Películas y TV Shows</h2> :  <h2>Películas</h2>*/} 
                    {personaje.films?.map((pelis, idx) => idx < 3 && (
                        <li key={pelis}>🎬{pelis}</li>
                      ))}                    
                    {personaje.tvShows?.map((series, idx) => idx < 3 && (
                      <li key={series}>📺{series}</li>
                    ))}
                  </ul>
                </div>
              </div> 

            </div>
            )

          ))
        }
        </>
      </div>
    </>
  )
}

export default App
