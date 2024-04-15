import Link from 'next/link';

export function Footer() {
    return (
        <footer className="pt-16 pb-12 sm:pt-24 sm:pb-16">
            <p className="text-sm">
                <Link
                    href="https://www.kaggle.com/datasets/sootersaalu/amazon-top-50-bestselling-books-2009-2019"
                    className="underline transition decoration-dashed text-primary underline-offset-8 hover:opacity-80"
                >
                    Data source
                </Link>
            </p>
        </footer>
    );
}
