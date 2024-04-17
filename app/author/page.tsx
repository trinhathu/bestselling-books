import { AuthorData } from '../../components/gantt';

import { getData } from '../bestsellers/route';
import Author from './author';

export const metadata = {
    title: 'Bestselling Authors'
};

type BestsellingBook = {
    years: Set<number>;
    genre: Set<string>;
    books: Record<number, string>;
};

/** Grab the bestselling authors, sort them by most -> least years on the bestsellers list, and transform the data to match the AuthorData type */
const getAuthorsByGenre = (
    dataByAuthor: Record<string, BestsellingBook>,
    genre: 'Fiction' | 'Non Fiction'
): AuthorData[] =>
    Object.entries(dataByAuthor)
        .filter(([, data]) => data.genre.has(genre) && data.years.size > 3)
        .map(([author, data]) => ({ author, ...data }))
        .sort((a, b) => a.years.size - b.years.size)
        .flatMap(({ author, years, books }) =>
            [...years].map((year) => ({ author, year, book: books[year] } as AuthorData))
        );

export default function Page() {
    const data = getData();
    const dataByAuthor: Record<string, BestsellingBook> = {};
    data.forEach((book) => {
        if (!dataByAuthor[book['Author']]) {
            dataByAuthor[book['Author']] = {
                years: new Set(),
                genre: new Set(),
                books: {}
            };
        }
        dataByAuthor[book['Author']].years.add(book['Year']);
        dataByAuthor[book['Author']].genre.add(book['Genre']);
        dataByAuthor[book['Author']].books[book['Year']] = book['Name'];
    });

    const fictionAuthors = getAuthorsByGenre(dataByAuthor, 'Fiction');
    const nonfictionAuthors = getAuthorsByGenre(dataByAuthor, 'Non Fiction');

    return <Author fictionAuthors={fictionAuthors} nonfictionAuthors={nonfictionAuthors} />;
}
