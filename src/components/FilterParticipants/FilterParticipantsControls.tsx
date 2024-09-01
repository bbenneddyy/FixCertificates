"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GetCSVButton from "../Buttons/GetCSVButton";

export default function FilterParticipantsControl() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
    const [statusFilters, setStatusFilters] = useState<string[]>(searchParams.getAll("status"));
    const [placeFilters, setPlaceFilters] = useState<string[]>(searchParams.getAll("place"));

    useEffect(() => {
        setSearchTerm(searchParams.get("query") || "");
        setStatusFilters(searchParams.getAll("status"));
        setPlaceFilters(searchParams.getAll("place"));

    }, [searchParams]);

    const handleSearch = (searchTerm: string) => {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
            params.set("query", searchTerm);
        } else {
            params.set("query", "");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const handleStatusFilter = (status: string) => {
        const params = new URLSearchParams(searchParams);
        const statusFilters = params.getAll("status");
        console.log(statusFilters);
        if (statusFilters.includes(status)) {
            params.delete("status");
            statusFilters.forEach(s => {
                if (s !== status) params.append("status", s);
            });
        } else {
            params.append("status", status);
        }
        console.log(params);
        replace(`${pathname}?${params.toString()}`);
    };
    const handlePlaceFilter = (place: string) => {
        const params = new URLSearchParams(searchParams);
        const placeFilters = params.getAll("place");
        console.log(placeFilters);
        if (placeFilters.includes(place)) {
            params.delete("place");
            placeFilters.forEach(s => {
                if (s !== place) params.append("place", s);
            });
        } else {
            params.append("place", place);
        }
        console.log(params);
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center m-5 space-x-6">
            <div className="flex space-x-3">
                {["accepted", "rejected", "pending"].map(status => (
                    <div key={status} className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                                checked={statusFilters.includes(status)}
                                onChange={() => handleStatusFilter(status)}
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label className="font-medium text-gray-900">
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex space-x-3">
                {["online", "onsite"].map(place => (
                    <div key={place} className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                                checked={placeFilters.includes(place)}
                                onChange={() => handlePlaceFilter(place)}
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label className="font-medium text-gray-900">
                                {place.charAt(0).toUpperCase() + place.slice(1)}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600">
                    <input
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="search"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            handleSearch(e.target.value);
                        }}
                    />
                </div>
            </div>
            <GetCSVButton />
        </div>
    );
}
