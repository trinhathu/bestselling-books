import { getData } from '../bestsellers/route';
import Genre from './genre';

export const metadata = {
    title: 'Genre'
};

export type BookGenreCount = {
    Fiction: number;
    'Non Fiction': number;
};

export default function Page() {
    const data = getData();
    const dataByYear: Record<string, BookGenreCount> = {};
    data.forEach((book) => {
        if (!dataByYear[book['Year']]) {
            dataByYear[book['Year']] = {
                Fiction: 0,
                'Non Fiction': 0
            };
        }
        dataByYear[book['Year']][book['Genre']]++;
    });

    return <Genre data={dataByYear} />;
}
