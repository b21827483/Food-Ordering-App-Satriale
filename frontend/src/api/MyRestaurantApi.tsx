import type { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { data } from "react-router-dom";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    
    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },            
        });

        if (!res.ok) {
            throw new Error("Failed to get restaurant");
        }
        return res.json();
    };

    const {data: restaurant,
           isLoading} = useQuery({queryKey: ["fetchMyRestaurant"], queryFn: getMyRestaurantRequest});
           
    return {restaurant, isLoading};    
};

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant[]> => {

        const accessToken = await getAccessTokenSilently();

        const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,

            },
            body: restaurantFormData
        });

        if (!res.ok) {
            throw new Error("Failed to create restaurant");
        }

        return res.json();
    };

    const { mutate: createRestaurant,
            isPending,
            isSuccess,
            error
          } = useMutation({mutationFn: createMyRestaurantRequest});
    
    if (isSuccess) {
        toast.success("Restaurant created");
    }

    if (error) {
        toast.error("Unable to create restaurant");
    }

    return { createRestaurant, isPending }
};

export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {

        const accessToken = await getAccessTokenSilently();

        const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,

            },
            body: restaurantFormData
        });

        if (!res.ok) {
            throw new Error("Failed to update restaurant");
        }

        return res.json();
    };

    const { mutate: updateRestaurant,
            isPending,
            isSuccess,
            error
          } = useMutation({mutationFn: updateMyRestaurantRequest});
    
    if (isSuccess) {
        toast.success("Restaurant updated");
    }

    if (error) {
        toast.error("Unable to update restaurant");
    }

    return { updateRestaurant, isPending }
};

export const useGetMyRestaurantOrders = () => {

    const { getAccessTokenSilently } = useAuth0();

    const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {

        const accessToken = getAccessTokenSilently();
        const res = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        }); 

        if (!res.ok) {
            throw new Error("Failed to fetch ordes");   
        }

        return res.json();
    };

    const { data: orders, isLoading } = useQuery({queryKey: ["fetchMyRestaurantOrders"], queryFn: getMyRestaurantOrdersRequest});

    return {orders, isLoading};
};

