'use client';

import { useMemo } from 'react';

import { useParentSize, useScreenSize } from '@visx/responsive';

import VerticalBarGroup from '../../components/bargroup';
import { BookGenreCount } from './page';

type GenreProps = {
    data: Record<string, BookGenreCount>;
};

export default function Genre({ data }: GenreProps) {
    const { parentRef, width } = useParentSize({ debounceTime: 150 });
    const { height: screenHeight } = useScreenSize({ debounceTime: 150 });

    const height = useMemo(() => Math.min(500, screenHeight), [screenHeight]);

    const genreData = useMemo(() => Object.keys(data).map((year) => ({ date: year, ...data[year] })), [data]);

    return (
        <main className="flex flex-col gap-8 sm:gap-16 relative">
            <section className="flex flex-col gap-4" ref={parentRef}>
                <h1>Bestsellers by Genre</h1>
                <p>Comparing which sells more--fiction or non fiction books.</p>
                <VerticalBarGroup width={width} height={height} data={genreData} />
            </section>
        </main>
    );
}
