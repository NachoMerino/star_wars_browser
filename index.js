var renderers = {};
var modalElement = createModal();
var modalContentElement = modalElement.querySelector('.content');
var modalCloseButton = modalElement.querySelector('.controls button');
modalCloseButton.addEventListener('click', hideModal);
document.body.appendChild(modalElement);

var mainObj = document.getElementById('main');
//var menuObj = document.getElementById('menu');
var mainElement = document.querySelector('main');


function createModal() {
    var element = document.createElement('div');
    element.classList.add('modal');
    element.innerHTML = `
  <div class="body">
    <div class="controls">
      <button>Close the Info.</button>
    </div>
    <div class="content"></div>
  </div>
  <div class="underlay"></div>`
    return element;
}


function showModal(contentElement) {
    modalContentElement.innerHTML = '';
    modalContentElement.appendChild(contentElement);
    modalElement.classList.add('open');
}

function hideModal() {
    modalElement.classList.remove('open');
}

function loadData(url, done) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            var responseObj = JSON.parse(xhr.responseText);
            done(responseObj);
        } else {
            console.log('error, status code is: ' + xhr.status);
        }
    }
    xhr.send();
}

function loadPeople(done) {
    loadData('https://swapi.co/api/people/', done);
}

function loadPlanet(url, done) {
    loadData(url, done);
}

function renderPeople(people) {
    console.log('rendering persons');
    mainObj.innerHTML = '';
    var navObj = document.createElement('nav');
    //cardsObj.setAttribute('id', 'nextprevnav');
    mainElement.appendChild(navObj);
    if (people.previous != null) {
        var prevButtonObj = document.createElement('button');
        prevButtonObj.textContent = 'Previous';
        prevButtonObj.classList.add('previous');
        navObj.appendChild(prevButtonObj);
        prevButtonObj.addEventListener('click', function() {
            loadData(people.previous, renderPeople);
        });
    }
    if (people.next != null) {
        var nextButtonObj = document.createElement('button');
        nextButtonObj.textContent = 'Next';
        nextButtonObj.classList.add('next');
        navObj.appendChild(nextButtonObj);
        nextButtonObj.addEventListener('click', function() {
            loadData(people.next, renderPeople);
        });
    }
    var cardsObj = document.createElement('div');
    //cardsObj.classList.add('container');
    cardsObj.setAttribute('id', 'container');
    mainElement.appendChild(cardsObj);


    people.results.forEach(function(person) {
        var sectionObj = document.createElement('section');
        sectionObj.classList.add('person');

        var genderSymbol;
        switch (person.gender) {
            case 'male':
                genderSymbol = '♂';
                break;
            case 'female':
                genderSymbol = '♀';
                break;
            default:
                genderSymbol = '❓';
                break;
        }


        sectionObj.innerHTML = `
        <header>
          <h1>
            ${person.name}
            <span class="gender" title="gender: ${person.gender}">${genderSymbol}</span>
          </h1>
        </header>
                <button>Details of Home World</button>
        <div>
          <li>
            <span class="label">Birth Year:</span>
            <span class="value">${person.birth_year}.</span>
          </li>
          <li>
            <span class="label">Eye Color:</span>
            <span class="value">${person.eye_color}.</span>
          </li>
          <li>
            <span class="label">Skin Color:</span>
            <span class="value">${person.skin_color}.</span>
          </li>
          <li>
            <span class="label">Hair Color:</span>
            <span class="value">${person.hair_color}.</span>
          </li>
          <li>
            <span class="label">Height:</span>
            <span class="value">${person.height} m.</span>
          </li>
          <li>
            <span class="label">Mass:</span>
            <span class="value">${person.mass} kg.</span>
          </li>
        </div>`;
        sectionObj.querySelector('button')
            .addEventListener('click', function() {
                loadPlanet(person.homeworld, renderPlanet);
            });

        cardsObj.appendChild(sectionObj);
    });
};
renderers.people = renderPeople;

function renderUnimplemented() {
    mainElement.innerHTML = '<h1>Sorry, this is not implemented yet.</h1>'
}

function renderMenu(data) {
    var menuObj = document.querySelector('body > header > nav > ul');
    var keys = Object.keys(data);
    keys.forEach(function(key) {
        var liObj = document.createElement('li');
        menuObj.appendChild(liObj);
        var aObj = document.createElement('a');
        aObj.setAttribute("id", key);
        aObj.textContent = key;
        liObj.appendChild(aObj);
        aObj.addEventListener('click', function() {
            if (!renderers[key]) return renderUnimplemented();
            loadData(data[key], renderers[key]);
        })
    });
}
loadData('https://swapi.co/api/', renderMenu);




function renderPlanet(planet) {
    var sectionObj = document.createElement('section');
    showModal(sectionObj);

    sectionObj.innerHTML = `
        <header>
          <h1>
            ${planet.name}
          </h1>
        </header>
        <div>
          <li>
            <span class="label">Climate:</span>
            <span class="value">${planet.climate}.</span>
          </li>
          <li>
            <span class="label">Gravity:</span>
            <span class="value">${planet.gravity}.</span>
          </li>
          <li>
            <span class="label">Terrain:</span>
            <span class="value">${planet.terrain}.</span>
          </li>
          <li>
            <span class="label">Surface Water:</span>
            <span class="value">${planet.surface_water}.</span>
          </li>
          <li>
            <span class="label">Population:</span>
            <span class="value">${planet.population} m.</span>
          </li>
          <li>
            <span class="label">Diameter:</span>
            <span class="value">${planet.diameter} kg.</span>
          </li>
        </div>`;
}
//starships
function renderStarships(starships) {
    console.log('rendering starships');
    mainObj.innerHTML = '';
    var navObj = document.createElement('nav');
    //cardsObj.setAttribute('id', 'nextprevnav');
    mainElement.appendChild(navObj);
    if (starships.previous != null) {
        var prevButtonObj = document.createElement('button');
        prevButtonObj.textContent = 'Previous';
        prevButtonObj.classList.add('previous');
        navObj.appendChild(prevButtonObj);
        prevButtonObj.addEventListener('click', function() {
            loadData(starships.previous, renderStarships);
        });
    }
    if (starships.next != null) {
        var nextButtonObj = document.createElement('button');
        nextButtonObj.textContent = 'Next';
        nextButtonObj.classList.add('next');
        navObj.appendChild(nextButtonObj);
        nextButtonObj.addEventListener('click', function() {
            loadData(starships.next, renderStarships);
        });
    }
    var cardsObj = document.createElement('div');
    cardsObj.setAttribute('id', 'container');
    mainElement.appendChild(cardsObj);


    starships.results.forEach(function(starship) {
        var sectionObj = document.createElement('section');
        sectionObj.classList.add('starship');


        sectionObj.innerHTML = `
        <header>
          <h1>
            ${starship.name}
          </h1>
        </header>
        <div>
        <li>
            <span class="label">Manufacter:</span>
            <span class="value">${starship.manufacturer}.</span>
          </li>
          <li>
            <span class="label">Crew:</span>
            <span class="value">${starship.crew}.</span>
          </li>
          <li>
            <span class="label">Passengers:</span>
            <span class="value">${starship.passengers}</span>
          </li>
          <li>
            <span class="label">Cost in Credits:</span>
            <span class="value">${starship.cost_in_credits}.</span>
          </li>
          <li>
            <span class="label">Consumables:</span>
            <span class="value">${starship.consumables}.</span>
          </li>
          <li>
            <span class="label">Starship Class:</span>
            <span class="value">${starship.starship_class} m.</span>
          </li>

        </div>`;
        cardsObj.appendChild(sectionObj);
    });
};
renderers.starships = renderStarships;

/////planets
function renderPlanets(planets) {
    console.log('rendering planets');
    mainObj.innerHTML = '';
    var navObj = document.createElement('nav');
    //cardsObj.setAttribute('id', 'nextprevnav');
    mainElement.appendChild(navObj);
    if (planets.previous != null) {
        var prevButtonObj = document.createElement('button');
        prevButtonObj.textContent = 'Previous';
        prevButtonObj.classList.add('previous');
        navObj.appendChild(prevButtonObj);
        prevButtonObj.addEventListener('click', function() {
            loadData(planets.previous, renderPlanets);
        });
    }
    if (planets.next != null) {
        var nextButtonObj = document.createElement('button');
        nextButtonObj.textContent = 'Next';
        nextButtonObj.classList.add('next');
        navObj.appendChild(nextButtonObj);
        nextButtonObj.addEventListener('click', function() {
            loadData(planets.next, renderPlanets);
        });
    }
    var cardsObj = document.createElement('div');
    cardsObj.setAttribute('id', 'container');
    mainElement.appendChild(cardsObj);

    planets.results.forEach(function(planet) {
        var sectionObj = document.createElement('section');
        sectionObj.classList.add('planet');


        sectionObj.innerHTML = `
        <header>
          <h1>
            ${planet.name}
          </h1>
        </header>
        <div>
          <li>
            <span class="label">Climate:</span>
            <span class="value">${planet.climate}.</span>
          </li>
          <li>
            <span class="label">Gravity:</span>
            <span class="value">${planet.gravity}.</span>
          </li>
          <li>
            <span class="label">Terrain:</span>
            <span class="value">${planet.terrain}.</span>
          </li>
          <li>
            <span class="label">Surface Water:</span>
            <span class="value">${planet.surface_water}.</span>
          </li>
          <li>
            <span class="label">Population:</span>
            <span class="value">${planet.population} m.</span>
          </li>
          <li>
            <span class="label">Diameter:</span>
            <span class="value">${planet.diameter} kg.</span>
          </li>
        </div>`;
        cardsObj.appendChild(sectionObj);
    });
};
renderers.planets = renderPlanets;

//////films
function renderFilms(films) {
    console.log('rendering films');
    mainObj.innerHTML = '';
    var navObj = document.createElement('nav');
    mainElement.appendChild(navObj);
    if (films.previous != null) {
        var prevButtonObj = document.createElement('button');
        prevButtonObj.textContent = 'Previous';
        prevButtonObj.classList.add('previous');
        navObj.appendChild(prevButtonObj);
        prevButtonObj.addEventListener('click', function() {
            loadData(films.previous, renderFilms);
        });
    }
    if (films.next != null) {
        var nextButtonObj = document.createElement('button');
        nextButtonObj.textContent = 'Next';
        nextButtonObj.classList.add('next');
        navObj.appendChild(nextButtonObj);
        nextButtonObj.addEventListener('click', function() {
            loadData(films.next, renderFilms);
        });
    }
    var cardsObj = document.createElement('div');
    cardsObj.setAttribute('id', 'container');
    mainElement.appendChild(cardsObj);


    films.results.forEach(function(film) {
        var sectionObj = document.createElement('section');
        sectionObj.classList.add('film');


        sectionObj.innerHTML = `
        <header>
          <h1>
            ${film.title}
          </h1>
        </header>
        <div>
        <li>
            <span class="label">Episode Number:</span>
            <span class="value">${film.episode_id}.</span>
          </li>
          <li>
            <span class="label">Director:</span>
            <span class="value">${film.director}.</span>
          </li>
          <li>
            <span class="label">Producer:</span>
            <span class="value">${film.producer}</span>
          </li>
          <li>
            <span class="label">Release Date:</span>
            <span class="value">${film.release_date}.</span>
          </li>
          <li>
            <span class="label">Opening of the films:</span>
            <span class="value">${film.opening_crawl} m.</span>
          </li>

        </div>`;
        cardsObj.appendChild(sectionObj);
    });
};
renderers.films = renderFilms;
//////species
function renderSpecies(species) {
    console.log('rendering species');
    mainObj.innerHTML = '';
    var navObj = document.createElement('nav');
    //cardsObj.setAttribute('id', 'nextprevnav');
    mainElement.appendChild(navObj);
    if (species.previous != null) {
        var prevButtonObj = document.createElement('button');
        prevButtonObj.textContent = 'Previous';
        prevButtonObj.classList.add('previous');
        navObj.appendChild(prevButtonObj);
        prevButtonObj.addEventListener('click', function() {
            loadData(species.previous, renderSpecies);
        });
    }
    if (species.next != null) {
        var nextButtonObj = document.createElement('button');
        nextButtonObj.textContent = 'Next';
        nextButtonObj.classList.add('next');
        navObj.appendChild(nextButtonObj);
        nextButtonObj.addEventListener('click', function() {
            loadData(species.next, renderSpecies);
        });
    }
    var cardsObj = document.createElement('div');
    cardsObj.setAttribute('id', 'container');
    mainElement.appendChild(cardsObj);


    species.results.forEach(function(specie) {
        var sectionObj = document.createElement('section');
        sectionObj.classList.add('specie');


        sectionObj.innerHTML = `
        <header>
          <h1>
            ${specie.name}
          </h1>
        </header>
            <button>Details of Home World</button>
        <div>
        <li>
            <span class="label">Classification:</span>
            <span class="value">${specie.classification}.</span>
          </li>
          <li>
            <span class="label">Designation:</span>
            <span class="value">${specie.designation}.</span>
          </li>
          <li>
            <span class="label">Average Height:</span>
            <span class="value">${specie.average_height}</span>
          </li>
          <li>
            <span class="label">Skin Colors:</span>
            <span class="value">${specie.skin_colors}.</span>
          </li>
          <li>
            <span class="label">Hair Colors:</span>
            <span class="value">${specie.hair_colors}.</span>
          </li>
          <li>
            <span class="label">Eye Colors:</span>
            <span class="value">${specie.eye_colors} m.</span>
          </li>
          <li>
            <span class="label">Average Lifespan:</span>
            <span class="value">${specie.average_lifespan} m.</span>
          </li>
          <li>
            <span class="label">Language:</span>
            <span class="value">${specie.language} m.</span>
          </li>
        </div>`;
        sectionObj.querySelector('button')
            .addEventListener('click', function() {
                loadPlanet(specie.homeworld, renderPlanet);
            });
        cardsObj.appendChild(sectionObj);
    });
};
renderers.species = renderSpecies;

/////vehicles
function renderVehicles(vehicles) {
    console.log('rendering vehicles');
    mainObj.innerHTML = '';
    var navObj = document.createElement('nav');
    mainElement.appendChild(navObj);
    if (vehicles.previous != null) {
        var prevButtonObj = document.createElement('button');
        prevButtonObj.textContent = 'Previous';
        prevButtonObj.classList.add('previous');
        navObj.appendChild(prevButtonObj);
        prevButtonObj.addEventListener('click', function() {
            loadData(vehicles.previous, renderVehicles);
        });
    }
    if (vehicles.next != null) {
        var nextButtonObj = document.createElement('button');
        nextButtonObj.textContent = 'Next';
        nextButtonObj.classList.add('next');
        navObj.appendChild(nextButtonObj);
        nextButtonObj.addEventListener('click', function() {
            loadData(vehicles.next, renderVehicles);
        });
    }
    var cardsObj = document.createElement('div');
    cardsObj.setAttribute('id', 'container');
    mainElement.appendChild(cardsObj);


    vehicles.results.forEach(function(vehicle) {
        var sectionObj = document.createElement('section');
        sectionObj.classList.add('vehicle');


        sectionObj.innerHTML = `
        <header>
          <h1>
            ${vehicle.name}
          </h1>
        </header>
        <div>
        <li>
            <span class="label">Manufacter:</span>
            <span class="value">${vehicle.manufacturer}.</span>
          </li>
          <li>
            <span class="label">Model:</span>
            <span class="value">${vehicle.model}.</span>
          </li>
          <li>
            <span class="label">Length:</span>
            <span class="value">${vehicle.length} m.</span>
          </li>
          <li>
            <span class="label">Crew:</span>
            <span class="value">${vehicle.crew}.</span>
          </li>
          <li>
            <span class="label">Passengers:</span>
            <span class="value">${vehicle.passengers}</span>
          </li>

          <li>
            <span class="label">Consumables:</span>
            <span class="value">${vehicle.consumables}.</span>
          </li>
          <li>
            <span class="label">vehicle Class:</span>
            <span class="value">${vehicle.starship_class}</span>
          </li>
          <li>
            <span class="label">Cargo Capacity:</span>
            <span class="value">${vehicle.cargo_capacity}</span>
          </li>

        </div>`;
        cardsObj.appendChild(sectionObj);
    });
};
renderers.vehicles = renderVehicles;



loadPeople(renderPeople);