import { useSearchRestaurants } from "@/api/RestaurantApi";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { type SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string;
    page: number;
}

const SearchPage = () => {

    const { city } = useParams();
    const [ searchState, setSearchState ] = useState<SearchState>({
        searchQuery: "",
        page: 1,
    }); 
    const { results, isLoading } = useSearchRestaurants(searchState, city);

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (!results?.data || !city) {
        return <span>No results found</span>
    }

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page: page
        }));
    };

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState: SearchState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery
        }));
    };

    const resetSearch = () => {
        setSearchState((prevState: SearchState) => ({
            ...prevState,
            searchQuery: ""
        }));
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr]">
            <div id="cuisine_list"></div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                  searchQuery={searchState.searchQuery}
                  onSubmit={setSearchQuery} 
                  placeHolder="Search by cuisine or restaurant name" 
                  onReset={resetSearch} />
                <SearchResultsInfo total={results?.pagination.total} city={city}></SearchResultsInfo>
                {results.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant} />
                ))}
                <PaginationSelector 
                  page={results.pagination.page} 
                  pages={results.pagination.pages} 
                  onPageChange={setPage} />
            </div>
        </div>
    )
};

export default SearchPage