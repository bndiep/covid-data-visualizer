import { useState, useEffect } from 'react'

const GraphContainer = () => {
  const [administered, setAdministered] = useState(0)
  const [vaccinatedPopulation, setVaccinatedPopulation] = useState(0)
  const [partiallyVaccinated, setPartiallyVaccinated] = useState(0)
  const [totalPopulation, setTotalPopulation] = useState(0)
  // async always returns a Promise
  // asycn is a prefix wrapper for Promises
  const showVaccinePopulation = async () => {
    // use await to wait for the Promise to resolve
    let response = await fetch('https://covid-api.mmediagroup.fr/v1/vaccines?country=US')
    let vaccinationData = response.json()
    // don't forget to return the data!
    return vaccinationData
  }

  useEffect(() => {
    showVaccinePopulation()
    .then(data => {
      setAdministered(data['All']['administered'])
      setVaccinatedPopulation(data['All']['people_vaccinated'])
      setPartiallyVaccinated(data['All']['people_partially_vaccinated'])
      setTotalPopulation(data['All']['population'])
    })
    .catch(error => {
      console.log('error', error)
    })
  }, [])

  return (
    <>
      <h1>Vaccinated Population in US</h1>
      <p>Population: {totalPopulation}</p>
      <p>Administered: {administered}</p>
      <p>Number of People Vaccinateed: {vaccinatedPopulation}</p>
      <p>Number of People Partially Vaccinated: {partiallyVaccinated}</p>
    </>
  )
}

export default GraphContainer