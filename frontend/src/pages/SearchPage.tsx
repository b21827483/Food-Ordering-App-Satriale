import { useSearchRestaurants } from "@/api/RestaurantApi";
import { useParams } from "react-router-dom";

const SearchPage = () => {

    const { city } = useParams();
    const { results } = useSearchRestaurants(city);

    return (<span>{city}</span>)
};

export default SearchPage