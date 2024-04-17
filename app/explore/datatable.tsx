'use client';

import { useState } from 'react';

import Sortable from '../../components/sortable';
import { BookData } from '../../shared/types';

type DatatableProps = {
    data: Record<string, BookData[]>;
};

export default function Datatable({ data }: DatatableProps) {
    const [year, setYear] = useState(Object.keys(data)[0]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(event.target.value);
    };

    return (
        <section className="flex flex-col gap-4">
            <h1>Explore the Data</h1>
            <div className="px-6">
                <label htmlFor="year" className="mr-2 text-sm font-medium leading-6">
                    Year:
                </label>
                <select
                    id="year"
                    name="year"
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 max-w-32 sm:text-sm sm:leading-6"
                    onChange={handleSelectChange}
                    value={year}
                >
                    {Object.keys(data).map((y) => (
                        <option key={y}>{y}</option>
                    ))}
                </select>
            </div>
            <Sortable data={data[year]} />
        </section>
    );
}
