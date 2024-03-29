import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { ClientOnly } from 'remix-utils/client-only';
import Main from '~/components/main';
import stylesheet from '~/tailwind.css';

export const meta: MetaFunction = () => {
  return [
    { title: 'Nihongo' },
    { name: 'description', content: 'App to learn Hihon words' },
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
        {() => <Main />}
      </ClientOnly>
    </div>
  );
}
