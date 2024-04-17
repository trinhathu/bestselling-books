import Link from 'next/link';

const navItems = [
    { linkText: 'By Title', href: '/title' },
    { linkText: 'By Author', href: '/author' },
    { linkText: 'By Genre', href: '/genre' },
    { linkText: 'Explore the Data', href: '/explore' }
];

export function Header() {
    return (
        <nav className="flex flex-wrap items-center gap-4 pt-6 pb-16 sm:pt-12 sm:pb-24">
            <Link href="/" className="text-5xl no-underline">
                📚🔍
            </Link>
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
