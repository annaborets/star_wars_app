import withSwapiService from "../../hoc/withSwapiService"
import { RESOURCE_CATEGORIES } from '../../services/service'
import ItemDetails from './ItemDetails'

export const PersonDetails = withSwapiService(RESOURCE_CATEGORIES.PEOPLE)(ItemDetails)
export const PlanetDetails = withSwapiService(RESOURCE_CATEGORIES.PLANETS)(ItemDetails)
export const FilmDetails = withSwapiService(RESOURCE_CATEGORIES.FILMS)(ItemDetails)
export const StarshipsDetails = withSwapiService(RESOURCE_CATEGORIES.STARSHIPS)(ItemDetails)
export const VehiclesDetails = withSwapiService(RESOURCE_CATEGORIES.VEHICLES)(ItemDetails)
export const SpeciesDetails = withSwapiService(RESOURCE_CATEGORIES.SPECIES)(ItemDetails)
