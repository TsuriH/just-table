const inputEl = document.getElementById('input-value')
const containerEl = document.getElementById('container')
let url;
let countries;

function getSelectedCountriesUrl(event) {
    if (event.target.id === 'all') {
        url = 'https://restcountries.com/v3.1/all'
    }
    else if (event.target.id === 'specific') {
        url = `https://restcountries.com/v3.1/name/${inputEl.value}`
    }
    sortCountriesByContinent()
 
}

function getSelectedCountriesInfo(url) {
    return fetch(url)
        .then(res => res.json())
        .then(data => data)
}


async function sortCountriesByContinent() {

    const data = await getSelectedCountriesInfo(url)
    numOfCountriesInContinent = {}
    let contentForTable = ""

    data.map(item => {

        if (numOfCountriesInContinent[item.region]) {
            numOfCountriesInContinent[item.region] += 1
        }
        else {
            numOfCountriesInContinent[item.region] = 1
        }

    })

    for (let continent in numOfCountriesInContinent) {
        contentForTable +=
            `<tr>

            <td>${continent}</td>
            <td>${numOfCountriesInContinent[continent]}</td>

             </tr>`
    }

    containerEl.innerHTML = `<table>

                                <tr>
                                    <th>Continent</th>
                                    <th>Numbers Of Countries</th>
                                </tr>
                                   ${contentForTable}

                           </table>`


getCountryPopulation(data)


}


 function getCountryPopulation(data) {
    let result = ""
    for(let country in data){
        result +=
       `<tr>
            <td>
                ${data[country].name.common}:
            </td>

            <td>
                ${data[country].population}
            </td>
       </tr>` 
    }
    
    containerEl.innerHTML += `<table>
                                    <tr>
                                        <th>Country</th>
                                        <th>Population</th>
                                    </tr>
                                    ${result}

                            </table>`

}