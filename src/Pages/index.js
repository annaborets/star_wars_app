import withSwapiService from "../hoc/withSwapiService";
import { RESOURCE_CATEGORIES } from '../services/service'
import List from '../components/List/List'
import withFilters from "../hoc/withFilters";
import { FILTER_TYPE } from '../components/Filter/Filter'

const peopleFilterFields = [
    {
        type: FILTER_TYPE.CHECKBOX,
        field: 'gender',
    },
    {
        type: FILTER_TYPE.CHECKBOX,
        field: 'eye_color',
    },
]
export const planetsFilterFields = [
    {
        type: FILTER_TYPE.CHECKBOX,
        field: 'climate',
    },
    {
        type: FILTER_TYPE.RANGE,
        field: 'diameter'
    }
]
const filmsFilterFields = [
    {
        type: FILTER_TYPE.CHECKBOX,
        field: 'director',
    },
    {
        type: FILTER_TYPE.CHECKBOX,
        field: 'producer'
    },
]
const starshipsFilterFields = [
    {
        type: FILTER_TYPE.CHECKBOX,
        field: 'hyperdrive_rating',
    },
    {
        type: FILTER_TYPE.RANGE,
        field: 'passengers'
    },
]
const vehiclesFilterFields = [
    {
        type: FILTER_TYPE.CHECKBOX,
        field: 'manufacturer',
    },
    {
        type: FILTER_TYPE.RANGE,
        field: 'crew'
    },
]
const speciesFilterFields = [
    {
        type: FILTER_TYPE.CHECKBOX,
        field: 'classification',
    },
    {
        type: FILTER_TYPE.RANGE,
        field: 'average_lifespan'
    },
]


export const PeoplePage = withFilters(peopleFilterFields)(withSwapiService(RESOURCE_CATEGORIES.PEOPLE)(List))
export const PlanetsPage = withFilters(planetsFilterFields)(withSwapiService(RESOURCE_CATEGORIES.PLANETS)(List))
export const FilmsPage = withFilters(filmsFilterFields)(withSwapiService(RESOURCE_CATEGORIES.FILMS)(List))
export const StarShipsPage = withFilters(starshipsFilterFields)(withSwapiService(RESOURCE_CATEGORIES.STARSHIPS)(List))
export const VehiclesPage = withFilters(vehiclesFilterFields)(withSwapiService(RESOURCE_CATEGORIES.VEHICLES)(List))
export const SpeciesPage = withFilters(speciesFilterFields)(withSwapiService(RESOURCE_CATEGORIES.SPECIES)(List))
