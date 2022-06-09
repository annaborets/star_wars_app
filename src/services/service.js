export const RESOURCE_CATEGORIES = {
    PEOPLE: 'people',
    FILMS: 'films',
    STARSHIPS: 'starships',
    VEHICLES: 'vehicles',
    SPECIES: 'species',
    PLANETS: 'planets'
}

const IMAGES_BASE_URL = 'https://starwars-visualguide.com/assets/img'
const API_BASE_URL = 'https://swapi.dev/api';


const peopleFieldsToPick = ['id', 'name', 'gender', 'img', 'eye_color', 'skin_color', 'height', 'mass', 'birth_year']
const planetFieldsToPick = ['id', 'climate', 'gravity', 'name', 'img', 'diameter', 'orbital_period', 'population', 'rotation_period', 'surface_water']
const filmsFieldsToPick = ['id', 'producer', 'director', 'title', 'img', 'release_date', 'opening_crawl']
const starshipFieldsToPick = ['id', 'hyperdrive_rating', 'cargo_capacity', 'name', 'img', 'consumables', 'manufacturer', 'cost_in_credits', 'length', 'passengers']
const vehiclesFieldsToPick = ['id', 'name', 'cargo_capacity', 'length', 'img', 'consumables', 'manufacturer', 'cost_in_credits', 'passengers', 'crew']
const speciesFieldsToPick = ['id', 'name', 'language', 'classification', 'average_lifespan', 'img', 'average_height']


const apiService = {
    async getResource(url) {
        const res = await fetch(url);
        return await res.json()
    },

    async getAllData(category) {
        const data = await this.getResource(`${API_BASE_URL}/${category}`);

        const pagesCount = Math.ceil(data.count / 10);

        const tasks = [];

        for (let i = 1; i <= pagesCount; i++) {
            tasks.push(this.getResource(`${API_BASE_URL}/${category}?page=${i}`))
        }

        const allResponses = await Promise.all(tasks);

        const concatenatedData = allResponses.map(response => response.results).flat()

        const dataWithImagesAndIds = concatenatedData
            .map(this.extendWithIdFromUrl)
            .map(item => this.extendWithImage(category, item))

        return dataWithImagesAndIds
    },

    async getDataPaged(category, page) {
        const data = await this.getResource(`${API_BASE_URL}/${category}/?page=${page}`);

        const dataWithImagesAndIds = this.extendWithImages(category, this.extendWithIdsFromUrl(data.results))

        return { ...data, results: dataWithImagesAndIds };
    },

    extendWithImage(category, item) {


        const idRegex = /\d+/



        const itemId = item.url.match(idRegex)[0]
        const itemImageUrl = this.getImage(category === RESOURCE_CATEGORIES.PEOPLE ? 'characters' : category, itemId)

        return { ...item, img: itemImageUrl }
    },

    extendWithIdFromUrl(item) {
        const idRegex = /\d+/;
        const id = item.url.match(idRegex)[0]

        return { ...item, id: parseInt(id) }
    },

    getImage(category, id) {
        return `${IMAGES_BASE_URL}/${category}/${id}.jpg`
    },

    createDataMethods(category) {
        let getAllItems;
        let getSingleItem;
        let searchByCategory;

        switch (category) {
            case (RESOURCE_CATEGORIES.PEOPLE):
                getAllItems = this.getAllPeopleData.bind(this);
                getSingleItem = this.getPerson.bind(this);
                searchByCategory = this.searchByPeople.bind(this);
                break;
            case (RESOURCE_CATEGORIES.PLANETS):
                getAllItems = this.getAllPlanetsData.bind(this);
                getSingleItem = this.getPlanet.bind(this);
                searchByCategory = this.searchByPlanet.bind(this);
                break;
            case (RESOURCE_CATEGORIES.FILMS):
                getAllItems = this.getAllFilmssData.bind(this);
                getSingleItem = this.getFilm.bind(this);
                searchByCategory = this.searchByFilm.bind(this);
                break;
            case (RESOURCE_CATEGORIES.STARSHIPS):
                getAllItems = this.getAllStarshipsData.bind(this);
                getSingleItem = this.getStarship.bind(this);
                searchByCategory = this.searchByStarship.bind(this);
                break;
            case (RESOURCE_CATEGORIES.VEHICLES):
                getAllItems = this.getAllVehiclesData.bind(this);
                getSingleItem = this.getVehicle.bind(this);
                searchByCategory = this.searchByVehicles.bind(this);
                break;
            case (RESOURCE_CATEGORIES.SPECIES):
                getAllItems = this.getAllSpeciesData.bind(this);
                getSingleItem = this.getSpecie.bind(this);
                searchByCategory = this.searchBySpecies.bind(this);
                break;
            default:
                throw new Error('No such category')
        }

        return {
            getAllItems,
            getSingleItem,
            searchByCategory,
        }
    },

    /** people methods */

    pickFieldsFromItem(fieldsToPick, item) {
        const keys = Object.keys(item);

        const result = {};

        keys.forEach(key => {
            if (fieldsToPick.includes(key)) {
                result[key] = item[key]
            }
        })

        return result;
    },

    pickFields(fieldsToPick, items) {
        return items.map((item) => this.pickFieldsFromItem(fieldsToPick, item))
    },

    async getAllPeopleData() {
        const data = await this.getAllData(RESOURCE_CATEGORIES.PEOPLE)

        return this.pickFields(peopleFieldsToPick, data);
    },

    async searchByPeople(searchTerm) {
        const data = await this.getResource(`${API_BASE_URL}/${RESOURCE_CATEGORIES.PEOPLE}?search=${searchTerm}`)

        const resultsWithIds = data.results.map(this.extendWithIdFromUrl)

        return { ...data, results: resultsWithIds }
    },

    async getPerson(id) {
        const data = await this.getResource(`${API_BASE_URL}/${RESOURCE_CATEGORIES.PEOPLE}/${id}`)

        return this.pickFieldsFromItem(peopleFieldsToPick, this.extendWithImage(RESOURCE_CATEGORIES.PEOPLE, data))
    },

    /** planets methods */

    async getAllPlanetsData() {
        const data = await this.getAllData(RESOURCE_CATEGORIES.PLANETS)

        return this.pickFields(planetFieldsToPick, data);
    },
    async getPlanet(id) {
        const data = await this.getResource(`${API_BASE_URL}/${RESOURCE_CATEGORIES.PLANETS}/${id}`)

        return this.pickFieldsFromItem(planetFieldsToPick, this.extendWithImage(RESOURCE_CATEGORIES.PLANETS, data))
    },

    async searchByPlanet(searchTerm) {
        const data = await this.getResource(`${API_BASE_URL}/${RESOURCE_CATEGORIES.PLANETS}?search=${searchTerm}`)

        const resultsWithIds = data.results.map(this.extendWithIdFromUrl)

        return { ...data, results: resultsWithIds }
    },


    /** films methods */
    async getAllFilmssData() {
        const data = await this.getAllData(RESOURCE_CATEGORIES.FILMS)

        return this.pickFields(filmsFieldsToPick, data);
    },
    async getFilm(id) {
        const data = await this.getResource(`${API_BASE_URL}/${RESOURCE_CATEGORIES.FILMS}/${id}`)

        return this.pickFieldsFromItem(filmsFieldsToPick, this.extendWithImage(RESOURCE_CATEGORIES.FILMS, data))
    },

    async searchByFilm(searchTerm) {
        const data = await this.getResource(`${API_BASE_URL}/${RESOURCE_CATEGORIES.FILMS}?search=${searchTerm}`)

        const resultsWithIds = data.results.map(this.extendWithIdFromUrl)

        return { ...data, results: resultsWithIds }
    },

    /** starships methods */
    async getAllStarshipsData() {
        const data = await this.getAllData(RESOURCE_CATEGORIES.STARSHIPS)

        return this.pickFields(starshipFieldsToPick, data);
    },
    async getStarship(id) {
        const data = await this.getResource(`${API_BASE_URL}/${RESOURCE_CATEGORIES.STARSHIPS}/${id}`)

        return this.pickFieldsFromItem(starshipFieldsToPick, this.extendWithImage(RESOURCE_CATEGORIES.STARSHIPS, data))
    },

    async searchByStarship(searchTerm) {
        const data = await this.getResource(`${API_BASE_URL}/${RESOURCE_CATEGORIES.STARSHIPS}?search=${searchTerm}`)

        const resultsWithIds = data.results.map(this.extendWithIdFromUrl)

        return { ...data, results: resultsWithIds }
    },

    /** vehciles methods */
    async getAllVehiclesData() {
        const data = await this.getAllData(RESOURCE_CATEGORIES.VEHICLES)

        return this.pickFields(vehiclesFieldsToPick, data);
    },
    async getVehicle(id) {
        const data = await this.getResource(`${API_BASE_URL}/${RESOURCE_CATEGORIES.VEHICLES}/${id}`)

        return this.pickFieldsFromItem(vehiclesFieldsToPick, this.extendWithImage(RESOURCE_CATEGORIES.VEHICLES, data))
    },

    async searchByVehicles(searchTerm) {
        const data = await this.getResource(`${API_BASE_URL}/${RESOURCE_CATEGORIES.VEHICLES}?search=${searchTerm}`)

        const resultsWithIds = data.results.map(this.extendWithIdFromUrl)

        return { ...data, results: resultsWithIds }
    },

    /** species methods */
    async getAllSpeciesData() {
        const data = await this.getAllData(RESOURCE_CATEGORIES.SPECIES)

        return this.pickFields(speciesFieldsToPick, data);
    },
    async getSpecie(id) {
        const data = await this.getResource(`${API_BASE_URL}/${RESOURCE_CATEGORIES.SPECIES}/${id}`)

        return this.pickFieldsFromItem(speciesFieldsToPick, this.extendWithImage(RESOURCE_CATEGORIES.SPECIES, data))
    },

    async searchBySpecies(searchTerm) {
        const data = await this.getResource(`${API_BASE_URL}/${RESOURCE_CATEGORIES.SPECIES}?search=${searchTerm}`)

        const resultsWithIds = data.results.map(this.extendWithIdFromUrl)

        return { ...data, results: resultsWithIds }
    },
}

export default apiService
