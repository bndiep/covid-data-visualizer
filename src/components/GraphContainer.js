import { useState, useEffect } from 'react'

const GraphContainer = () => {
  const [administered, setAdministered] = useState(0)
  const showVaccinePopulation = async () => {
    let response = await fetch('https://covid-api.mmediagroup.fr/v1/vaccines?country=US')
    let vaccinationData = response.json()
    console.log('vaccination data', vaccinationData)
    return vaccinationData
  }

  useEffect(() => {
    showVaccinePopulation()
    .then(data => {
      console.log('data', data['All']['administered'])
      setAdministered(data['All']['administered'])
    })
    .catch(error => {
      console.log('error', error)
    })
  }, [])

  console.log('administered', administered)
  return (
    <>
      <h1>Vaccinated Population in US</h1>
      {/* <p>{data}</p> */}
    </>
  )
}

export default GraphContainer