import { getData } from '../bestsellers/route';
import Title from './title';

export const metadata = {
    title: 'By Title'
};

export type TitlesByYear = {
    [key: string]: string[];
};

export default function Page() {
    const data = getData();
    const booksByYear: TitlesByYear = {};
    data.forEach((book) => {
        if (!booksByYear[book['Year']]) {
            booksByYear[book['Year']] = [];
        }
        booksByYear[book['Year']].push(book.Name);
    });

    return <Title data={booksByYear} />;
}
