'use client';

import { useMemo } from 'react';

import { useParentSize, useScreenSize } from '@visx/responsive';

import Gantt, { AuthorProps } from '../../components/gantt';

export default function Author({ fictionAuthors, nonfictionAuthors }: AuthorProps) {
    const { parentRef, width } = useParentSize({ debounceTime: 150 });
    const { height: screenHeight } = useScreenSize({ debounceTime: 150 });

    const height = useMemo(() => Math.max(300, screenHeight * 0.5), [screenHeight]);

    return (
        <main className="flex flex-col gap-8 sm:gap-16 relative">
            <section className="flex flex-col gap-4" ref={parentRef}>
                <h1>Bestselling Authors</h1>
                <p>Authors who have had bestselling books on Amazon for the most years.</p>

                <h2 className="text-2xl font-bold leading-9 tracking-tight text-white">Fiction</h2>
                <Gantt width={width} height={height} data={fictionAuthors} />

                <h2 className="text-2xl font-bold leading-9 tracking-tight text-white">Non Fiction</h2>
                <Gantt width={width} height={height} data={nonfictionAuthors} />
            </section>
        </main>
    );
}
