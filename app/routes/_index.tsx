/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { useEffect, useRef, useState } from 'react';
import mockData from '~/mockData';
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

// Я учу 10 слов на русском-японском
// Рандомайзер которьій
// - по кнопке вьідает слово на японском
// - по клике на рандомное слово показьівается ответ
// со словом - переводом
// - сделать конвертацию или туда или обратно (ориг на
// японский и наоборот)
// - добавить управление клавой
// - ПОТОМ слово на ориг и тьі должен вписать на японском
// (может с набора символов как клава)

interface WordPair {
  original: string;
  japanese: string;
}

export default function Index() {
  const [wordPair, setWordPair] = useState('');
  const [wordPairs, setWordPairs] = useState<WordPair[]>([]);
  const [chosenWord, setChosenWord] = useState<WordPair>();
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const changeWords = (e: React.ChangeEvent<HTMLInputElement>) => {
    const wordsWithSpaces = e.target.value;
    setWordPair(wordsWithSpaces);
  };

  const addWordPair = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const splitPair = wordPair.trim().split(' ');

    if (splitPair.length !== 2) {
      alert(`You're retarded. Read and try again`);
    } else {
      const [original, japanese] = splitPair.map((word) => word.trim());
      setWordPairs((prev) => [...prev, { original, japanese }]);
    }

    setWordPair('');
  };

  const getRandomWord = () => {
    console.log({ wordPairs });

    const randomIndex = Math.floor(Math.random() * wordPairs.length);
    setChosenWord(wordPairs[randomIndex]);
    setIsAnswerRevealed(false);
  };

  const revealAnswerWord = () => {
    setIsAnswerRevealed(true);
    // setIsAnswerRevealed((prev) => !prev);
  };

  useEffect(() => {
    console.log({ at: 'focusing input', inputRef });
    inputRef?.current?.focus();
  }, [inputRef]);

  return (
    <div
      style={{ fontFamily: 'Roboto Mono, monospace' }}
      className='flex flex-col items-center w-full p-4 h-[100vh] font-mono bg-eigengrauLight text-stone-300'
    >
      <h1 className='text-3xl lowercase font-bold text-center my-4'>
        Владік вчить японську
      </h1>

      <div className='flex gap-4 justify-center flex-col items-center w-full flex-1'>
        <div className='flex items-center'>
          {chosenWord ? (
            <>
              <button
                onClick={revealAnswerWord}
                className={`px-4 py-2 text-xl text-stone-300 hover:text-stone-500`}
              >
                {chosenWord?.original}
              </button>
              {isAnswerRevealed && (
                <p className={`text-center text-xl`}>
                  {' '}
                  -- {chosenWord?.japanese}
                </p>
              )}
            </>
          ) : (
            <button
              onClick={() => {}}
              className={`px-4 py-2 border-2 rounded-md invisible`}
            >
              Placeholder
            </button>
          )}
        </div>

        <div className='flex gap-4 items-center'>
          <form action='' onSubmit={addWordPair}>
            <input
              id='words'
              ref={inputRef}
              className='bg-eigengrau rounded-md py-2 px-4 text-stone-300 outline-none'
              type='text'
              value={wordPair}
              onChange={changeWords}
            />
          </form>
          <button
            onClick={getRandomWord}
            className='lowercase px-4 py-2 border-2 rounded-md border-stone-400 text-stone-300'
          >
            get random word
          </button>
        </div>
      </div>

      {/* Hints */}
      <div className='mt-4'>
        <label
          htmlFor='words'
          className='lowercase flex items-center text-center'
        >
          Input your words separated with spaces.
          <br />
          Enter 2 words and press <b>{'<Enter>'}</b>
          <br />
          <br />
          Click on selected word to reveal the answer
        </label>
      </div>

      {/* <div className=''>
        <pre>{JSON.stringify(wordPairs, null, 2)}</pre>
      </div> */}
    </div>
  );
}
