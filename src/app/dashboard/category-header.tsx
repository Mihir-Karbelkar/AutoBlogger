'use client';
import Link from 'next/link';
import { Category } from '../api/categories/route';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function CategoryHeader({
  categories,
}: {
  categories: Category[];
}) {
  const category = useSelectedLayoutSegment();
  const segment = usePathname();
  const { status } = useSession();
  const footerLinks = [
    {
      href: '/help',
      text: 'Help',
    },
    {
      href: '/contact-us',
      text: 'Contact Us',
    },
    {
      href: '#',
      text: 'Signout',
      onClick: () => {
        signOut({ callbackUrl: '/' });
      },
      hide: status === 'unauthenticated',
    },
  ];
  return (
    <>
      <div className="rounded-2xl bg-secondary sticky top-6 h-[90vh] w-full px-14 pt-14 flex flex-col">
        <p className="text-primary text-4xl">Board.</p>
        <div className="mt-8 flex-1">
          {categories
            .map((link) => ({
              ...link,
              link: `/dashboard/${link.id}`,
            }))
            .map((link) => (
              <Link
                key={`/dashboard/${link.link}`}
                href={`/dashboard/${link.id}?categoryName=${link.label}`}
                className={`w-full flex items-center text-primary text-lg mb-6 ${
                  link.link === segment ? 'font-bold text-2xl' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
        </div>
        <div className="mb-12">
          {footerLinks.map((link) =>
            link.hide ? null : (
              <div className="mb-3" key={link.href}>
                <Link
                  href={link.href}
                  className={`w-full text-primary text-md ${
                    link.href === segment ? 'font-bold ' : ''
                  }`}
                  onClick={() => {
                    link?.onClick?.();
                  }}
                >
                  {link.text}
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
