import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { ClientOnly } from 'remix-utils/client-only';
import Dictionary from '~/components/dictionary';
import stylesheet from '~/tailwind.css';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap',
  },
];

export default function Index() {
  return (
    <div
      style={{ fontFamily: 'Roboto Mono, monospace' }}
      className='flex flex-col items-center w-full p-4 h-[100vh] font-mono bg-eigengrauLight text-stone-300'
    >
      <ClientOnly fallback={<div>Only available on client</div>}>
        {() => <Dictionary />}
      </ClientOnly>
    </div>
  );
}
