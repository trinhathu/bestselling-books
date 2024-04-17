import Link from 'next/link';

export default function Page() {
    return (
        <main className="flex flex-col gap-8 sm:gap-16 relative">
            <section className="flex flex-col items-start gap-4">
                <h1>Welcome!</h1>
                <p>
                    This site attempts to explore different parts of the{' '}
                    <Link href="https://www.kaggle.com/datasets/sootersaalu/amazon-top-50-bestselling-books-2009-2019">
                        Amazon Top 50 Bestselling Books 2009 - 2019
                    </Link>{' '}
                    dataset. Take a look around by using the navigation above.
                </p>
                <p>
                    Built using <Link href="https://nextjs.org/">Next.js</Link> with{' '}
                    <Link href="https://airbnb.io/visx">Visx</Link> for visualizations, and deloyed on{' '}
                    <Link href="https://netlify.com/">Netlify</Link>.
                </p>
            </section>
        </main>
    );
}
