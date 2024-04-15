import Link from 'next/link';

const navItems = [
    { linkText: 'Home', href: '/' },
    { linkText: 'Title', href: '/title' },
    { linkText: 'Author', href: '/author' },
    { linkText: 'Genre', href: '/genre' },
    { linkText: 'Rating', href: '/rating' },
    { linkText: 'Reviews', href: '/reviews' },
    { linkText: 'Explore', href: '/exlore' }
];

export function Header() {
    return (
        <nav className="flex flex-wrap items-center gap-4 pt-6 pb-16 sm:pt-12 sm:pb-24">
            {!!navItems?.length && (
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                                className="inline-block px-1.5 py-1 transition hover:opacity-80 sm:px-3 sm:py-2"
                            >
                                {item.linkText}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}
