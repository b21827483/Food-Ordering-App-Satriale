import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { type SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import SortOptionDropDown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;
}

const SearchPage = () => {

    const { city } = useParams();
    const [ searchState, setSearchState ] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch"
    }); 

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const { results, isLoading } = useSearchRestaurants(searchState, city);

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (!results?.data || !city) {
        return <span>No results found</span>
    }

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page:1
        }));
    };

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1
        }));
    };

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
            <div id="cuisine_list">
                <CuisineFilter 
                  selectedCuisines={searchState.selectedCuisines} 
                  onChange={setSelectedCuisines}
                  isExpanded={isExpanded}
                  onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)} />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                  searchQuery={searchState.searchQuery}
                  onSubmit={setSearchQuery} 
                  placeHolder="Search by cuisine or restaurant name" 
                  onReset={resetSearch} />
                <div className="flex flex-row justify-between gap-3 lg:flex-row">
                    <SearchResultsInfo total={results?.pagination.total} city={city}></SearchResultsInfo>
                    <SortOptionDropDown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
                </div>
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