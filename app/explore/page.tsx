import { BookData } from '../../shared/types';
import { getData } from '../bestsellers/route';
import Datatable from './datatable';

export const metadata = {
    title: 'Explore the Data'
};

export default async function Page() {
    const data = getData();
    const booksByYear: Record<string, BookData[]> = {};
    data.forEach((book) => {
        if (!booksByYear[book['Year']]) {
            booksByYear[book['Year']] = [];
        }
        booksByYear[book['Year']].push(book);
    });

    return (
        <main className="flex flex-col gap-8 sm:gap-16 relative">
            <Datatable data={booksByYear} />
        </main>
    );
}
