import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSections from "./DetailsSection";
import { Separator } from "@radix-ui/react-separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import type { Restaurant } from "@/types";
import { useEffect } from "react";

const RestaurantSchema = z.object({
    restaurantName: z.string().nonempty({message: "restaurant name is required"}),
    city: z.string().nonempty({
        message: "City is a required field.",
    }),
    country: z.string().nonempty({
        message: "country name is required"}),
    deliveryPrice: z.coerce.number<number>({
        error: "must be a valid number"
    }).min(1, "delivery price name is required"),
    estimatedDeliveryTime: z.coerce.number<number>({
        error: "must be a valid number"
    }).min(1, "estimated delivery time is required"),
    cuisines: z.array(z.string()).nonempty({
        message: "please select at least one item"
    }),
    menuItems: z.array(
        z.object({
            name: z.string().min(1, "name is required"),
            price: z.coerce.number<number>().min(1, "price is required")
    })),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, {message : "restaurant image is required"}).optional()
}).refine((data) => data.imageUrl || data.imageFile, {
    message: "Image URL or Image File must be provided",
    path: ["imageFile"]
});

type RestaurantFormData = z.infer<typeof RestaurantSchema>;

type Props = {
    restaurant?: Restaurant;
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean
};

const ManageRestaurantForm = ({restaurant, onSave, isLoading}: Props) => {

    const form = useForm<RestaurantFormData>({ 
        resolver: zodResolver(RestaurantSchema),
        defaultValues: {
            restaurantName: "",
            city: "",
            country: "",
            deliveryPrice: 0,
            estimatedDeliveryTime: 1,
            cuisines: [],
            menuItems: [{name: "", price: 0}],
            imageFile: undefined,
        },
     });

     useEffect(() => {
        if (!restaurant) {
            return;
        }
        const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice / 100).toFixed(2));
        const menuItemsFormatted = restaurant.menuItems.map((item) => ({
            ...item,
            price: parseInt((item.price / 100).toFixed(2)),
        }));

        const updatedRestaurant = {
            ...restaurant,
            deliveryPrice: deliveryPriceFormatted,
            menuItems: menuItemsFormatted
        };

        form.reset(updatedRestaurant);
     }, [form, restaurant]);

    const onSubmit = (formDataJson: RestaurantFormData) => {
        const formData = new FormData();
        formData.append("restaurandName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine)
        });
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
        });
        if (formDataJson.imageFile) {
            formData.append(`imageFile`, formDataJson.imageFile);
        }
        
        onSave(formData);
    };

     return (
        <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="space-y-8 bg-gray-50 p-10 rounded-lg"
            >
                <DetailsSections />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
            </form> 
        </Form>
     )
}   

export default ManageRestaurantForm