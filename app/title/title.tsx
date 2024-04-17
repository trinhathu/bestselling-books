'use client';

import { useMemo, useState } from 'react';

import { useParentSize, useScreenSize } from '@visx/responsive';

import WordCloud from '../../components/wordcloud';
import { TitlesByYear } from './page';

type TitleProps = {
    data: TitlesByYear;
};

export default function Title({ data }: TitleProps) {
    const { parentRef, width } = useParentSize({ debounceTime: 600 });
    const { height: screenHeight } = useScreenSize({ debounceTime: 600 });

    const height = useMemo(() => Math.max(300, screenHeight * 0.8), [screenHeight]);
    const years = useMemo(() => Object.keys(data).map(Number), [data]);
    const [currentYear, setCurrentYear] = useState(Object.keys(data)[0]);

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentYear(event.target.value);
    };

    return (
        <main className="flex flex-col gap-8 sm:gap-16 relative" ref={parentRef}>
            <section className="flex flex-col gap-4">
                <h1>Bestselling Titles by Year</h1>
                <div>
                    <label htmlFor="year">Year</label>
                    <input
                        type="range"
                        id="year"
                        name="year"
                        min={Math.min(...years)}
                        max={Math.max(...years)}
                        className="w-full accent-indigo-600"
                        value={currentYear}
                        onChange={handleYearChange}
                    />

                    <div className="-mt-2 flex w-full justify-between">
                        {years.map((year) => (
                            <span key={year} className="text-sm text-gray-400">
                                {year}
                            </span>
                        ))}
                    </div>
                </div>

                <WordCloud width={width} height={height} data={data[currentYear]} />
            </section>
        </main>
    );
}
