import Link from 'next/link';

const links = [
  ['Dashboard', '/dashboard'],
  ['Search Profiles', '/profiles'],
  ['Job Listings', '/jobs'],
  ['Search Runs', '/runs'],
  ['Settings', '/settings']
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white p-4">
      <h1 className="mb-4 text-lg font-semibold">Job Review</h1>
      <nav className="space-y-1">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="block rounded px-3 py-2 text-sm hover:bg-slate-100">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
