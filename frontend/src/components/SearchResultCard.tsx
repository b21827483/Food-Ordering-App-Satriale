import type { Restaurant } from "@/types";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
    restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
    return (
        <Link to={`/detail/${restaurant._id}`} className="grid lg:grid-cols-[2fr-3fr] gap-5 group">
            <AspectRatio ratio={16 / 6}>
                <img src={restaurant.imageUrl} className="w-full h-full rounded object-cover"/>
            </AspectRatio>
            <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
                    {restaurant.restaurantName}
                </h3>
                <div id="card-content" className="grid md:grid-cols-2- gap-2">
                    <div className="flex flex-row flew-wrap">
                        {restaurant.cuisines.map((item, index) => (
                            <span className="flex">
                                <span >{item}</span>
                                {index < restaurant.cuisines.length - 1 && <Dot />}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1 text-green-600">
                            <Clock className="text-green-600" />
                            {restaurant.estimatedDeliveryTime} mins
                        </div>
                        <div className="flex items-center gap-1">
                            <Banknote />
                            Delivery Price {(restaurant.deliveryPrice / 100).toFixed(2)}₺
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SearchResultCard