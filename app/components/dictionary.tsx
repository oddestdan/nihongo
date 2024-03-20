import { Link, useParams } from '@remix-run/react';
import {
  getDictionary,
  updateDictionary,
} from '~/components/utils/localStorage';
import { WordPair } from './utils/types';
import { useRef, useState } from 'react';

const defaultNewPair = {
  original: '',
  japanese: '',
};

function removeAtIndex<T>(array: T[], index: number): T[] {
  if (index < 0 || index >= array.length) return array;

  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export default function Dictionary() {
  const dictionaryTitle = useParams<{ title: string }>().title ?? '';
  const wordPairs = getDictionary(dictionaryTitle);
  const [pairs, setPairs] = useState<WordPair[]>(wordPairs ?? []);
  const [newPair, setNewPair] = useState<WordPair>(defaultNewPair);
  const originalRef = useRef<HTMLInputElement>(null);

  const changeDictionaryEntry = (wordPair: WordPair, index: number) => {
    const copy = pairs.slice(0);
    copy[index] = wordPair;

    setTimeout(() => setPairs(copy), 1000);
  };

  const addNewPair = () => {
    const newPairs = [...pairs, newPair];

    setNewPair(defaultNewPair);
    setPairs(newPairs);
    updateDictionary(newPairs, dictionaryTitle);
  };

  const submitAddNew = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submitAddNew');
    e.preventDefault();
    addNewPair();
    originalRef?.current?.focus();
  };

  const removeWordPair = (index: number) => {
    setPairs(removeAtIndex(pairs, index));
  };

  const saveChanges = () => {
    updateDictionary(pairs, dictionaryTitle);
  };

  if (!dictionaryTitle) return null;

  return (
    <div className='flex flex-col items-center justify-between h-full'>
      <h1 className='text-3xl lowercase font-bold text-center mt-4 mb-6'>
        <Link className='hover:text-stone-400' to='/'>
          {'<'}
        </Link>{' '}
        dictionary: <b>{dictionaryTitle}</b>
      </h1>

      <div className='flex gap-4 mb-4'>
        <button
          onClick={saveChanges}
          className='hover:border-stone-500 hover:text-stone-400 lowercase w-fit px-4 py-2 border-2 rounded-md border-stone-400 text-stone-300'
        >
          save changes
        </button>
      </div>

      <ul className='flex overflow-y-scroll ml-[5px] w-[calc(100% + 5px)] flex-grow gap-4 flex-col items-center w-full flex-1'>
        {pairs.map(({ original, japanese }, i) => (
          <li
            key={`${original}-${japanese}`}
            className='w-full flex justify-center'
          >
            <input
              className='outline-none text-stone-300 py-1 text-center mx-4 bg-transparent border-b-[1px] border-stone-700 w-full'
              defaultValue={original}
              onChange={(e) =>
                changeDictionaryEntry({ original: e.target.value, japanese }, i)
              }
            />
            <button
              className='text-stone-300 hover:text-stone-500'
              onClick={() => removeWordPair(i)}
            >
              x
            </button>
            <input
              className='outline-none text-stone-300 py-1 text-center mx-4  bg-transparent border-b-[1px] border-stone-700 w-full'
              defaultValue={japanese}
              onChange={(e) =>
                changeDictionaryEntry({ original, japanese: e.target.value }, i)
              }
            />
          </li>
        ))}
      </ul>

      <hr className='border-stone-700 h-[1px] mt-8 mb-4 w-4 text-stone-700' />

      <form
        action=''
        onSubmit={submitAddNew}
        className='flex flex-col items-center justify-center gap-4'
      >
        <div className='flex'>
          <input
            className='outline-none text-stone-300 py-1 text-center mx-4 bg-transparent border-b-[1px] border-stone-700 w-full'
            value={newPair.original}
            placeholder='new original...'
            ref={originalRef}
            onChange={(e) =>
              setNewPair(({ japanese }) => ({
                original: e.target.value,
                japanese,
              }))
            }
          />
          |
          <input
            className='outline-none text-stone-300 py-1 text-center mx-4  bg-transparent border-b-[1px] border-stone-700 w-full'
            value={newPair.japanese}
            placeholder='new translation...'
            onChange={(e) =>
              setNewPair(({ original }) => ({
                original,
                japanese: e.target.value,
              }))
            }
          />
        </div>
        <button
          type='submit'
          className='hover:border-stone-500 hover:text-stone-400 lowercase w-fit px-4 py-2 border-2 rounded-md border-stone-400 text-stone-300'
        >
          add new words
        </button>
      </form>
    </div>
  );
}
