'use client';

import { useMemo, useState } from 'react';

// TODO: let user define this and/or expand to support more types
interface DataType {
    [key: string]: string | number;
}

type SortableProps = {
    data: DataType[];
};

type SortOrder = {
    key: string;
    direction: SortDirection;
};

enum SortDirection {
    Ascending,
    Descending
}

export default function Sortable({ data }: SortableProps) {
    // TODO: let the user customize these
    const ascendingChar = '↑';
    const descendingChar = '↓';
    const sortSymbols = {
        [SortDirection.Ascending]: ascendingChar,
        [SortDirection.Descending]: descendingChar
    };

    // assume all the data is consistent, grab the keys/column names from the first data point
    // TODO: let the user define these
    const tableKeys = Object.keys(data[0]);

    const [sortOrder, setSortOrder] = useState<SortOrder>({ key: tableKeys[0], direction: SortDirection.Ascending });

    const setSortKey = (key) => {
        const direction =
            sortOrder.key === key && sortOrder.direction === SortDirection.Ascending
                ? SortDirection.Descending
                : SortDirection.Ascending;
        setSortOrder({ key, direction });
    };

    const sortedData = useMemo(() => {
        let sortableItems = [...data];
        if (sortOrder !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortOrder.key] < b[sortOrder.key]) {
                    return sortOrder.direction === SortDirection.Ascending ? -1 : 1;
                }
                if (a[sortOrder.key] > b[sortOrder.key]) {
                    return sortOrder.direction === SortDirection.Ascending ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortOrder]);

    // TODO: let the user customize how they want to display the column names and data
    return (
        <table className="table-auto min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead>
                <tr>
                    {tableKeys.map((key) => (
                        <th key={key}>
                            <button
                                className="w-full px-6 py-3 text-start text-xs font-bold uppercase"
                                onClick={() => setSortKey(key)}
                            >
                                {key} {sortOrder.key === key && sortSymbols[sortOrder.direction]}
                            </button>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-500 dark:divide-neutral-700">
                {sortedData.map((datum, i) => (
                    <tr key={datum[tableKeys[0]]}>
                        {tableKeys.map((key) => (
                            <td key={`td-${i}-${key}`} className="px-6 py-4 text-sm font-medium">
                                {datum[key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
