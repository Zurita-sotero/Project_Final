import { useState, useEffect } from "react"
 
export function useFetchDisney(url) {
  const [data, setData] = useState(null)
  //Fetch para buscar eventos proximos en Mexico
  const getPersonajes = async() => {
    await fetch(url)
      .then((response) => response.json())
      .then(function (datos){
        //console.log(datos)
        var personajes = datos.data
        console.log(personajes)
        localStorage.setItem("personajes", JSON.stringify(personajes))
        setData(personajes)
      })
      .catch((error) => {
        console.log(error)
        var personajes = JSON.parse(localStorage.getItem("personajes"))
        setData(personajes)
      })
  }

  useEffect( () => {
    getPersonajes()
  }, [url])

  return {data}
}

  