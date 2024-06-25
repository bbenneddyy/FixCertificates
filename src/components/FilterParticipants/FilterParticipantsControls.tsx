"use client";
// Add checkboxes for filtering by status above the search input

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function FilterParticipantsControl() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (searchTerm: string, statusFilters: string[]) => {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
            params.set("query", searchTerm);
        } else {
            params.set("query", "");
        }
        statusFilters.forEach((status) => {
            params.delete(status);
        });
        replace(`${pathname}?${params.toString()}`);
    };

    const handleStatusFilter = (status: string) => {
        const params = new URLSearchParams(searchParams);
        const statusFilters = params.getAll("status");
        if (statusFilters.includes(status)) {
            params.delete("status", status);
        } else {
            params.append("status", status);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center m-5 space-x-6">
            <div className="flex space-x-3">
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                            onChange={() => handleStatusFilter("accepted")}
                        />
                    </div>
                    <div className="text-sm leading-6">
                        <label className="font-medium text-gray-900">
                            Accepted
                        </label>
                    </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                            onChange={() => handleStatusFilter("rejected")}
                        />
                    </div>
                    <div className="text-sm leading-6">
                        <label className="font-medium text-gray-900">
                            Rejected
                        </label>
                    </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                            onChange={() => handleStatusFilter("pending")}
                        />
                    </div>
                    <div className="text-sm leading-6">
                        <label className="font-medium text-gray-900">
                            Pending
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600">
                    <input
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="search"
                        defaultValue={''}
                        onChange={(e) => {
                            handleSearch(e.target.value, ["accepted", "rejected", "pending"]);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
