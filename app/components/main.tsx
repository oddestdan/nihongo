import { Link } from '@remix-run/react';
import React, { useEffect, useRef, useState } from 'react';
import {
  addWordPairToDictionary,
  getDictionary,
  getLastVisitedDictionaryTitle,
  getVisitedDictionaries,
  setLastVisitedDictionaryTitle,
} from '~/components/utils/localStorage';
import { WordPair } from '~/components/utils/types';

export default function Main() {
  const [dictionary, setDictionary] = useState(
    getLastVisitedDictionaryTitle() || 'default'
  );
  const visitedDictionaries = getVisitedDictionaries();
  const [wordPair, setWordPair] = useState('');
  const [chosenWord, setChosenWord] = useState<WordPair>();
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [isGayMode, setIsGayMode] = useState(false);
  const [isShortList, setIsShortList] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const wordPairs = getDictionary(dictionary);

  const changeDictionary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dictionaryTitle = e.target.value;
    setDictionary(dictionaryTitle);
  };

  const changeWords = (e: React.ChangeEvent<HTMLInputElement>) => {
    const wordsWithSpaces = e.target.value;
    setWordPair(wordsWithSpaces);
  };

  const addWordPair = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const splitPair = wordPair.trim().split(' ');

    if (splitPair.length !== 2) {
      alert(`Follow instructions below and try again`);
    } else {
      const [original, japanese] = splitPair.map((word) => word.trim());
      addWordPairToDictionary({ original, japanese }, dictionary);
    }

    setWordPair('');
    inputRef?.current?.focus();
  };

  const getRandomWord = () => {
    const wordPairs = getDictionary(dictionary);
    console.log({ wordPairs });

    const randomIndex = Math.floor(Math.random() * wordPairs.length);
    setChosenWord(wordPairs[randomIndex]);
    setIsAnswerRevealed(false);
  };

  const revealAnswerWord = () => {
    setIsAnswerRevealed(true);
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef]);

  const visibleDictionaries = isShortList
    ? visitedDictionaries.slice(0, 3)
    : visitedDictionaries;

  console.log(visibleDictionaries);

  return (
    <>
      <h1 className='text-3xl lowercase font-bold text-center my-4'>
        nihon | mode:{' '}
        <button
          className='underline underline-offset-4'
          onClick={() => setIsGayMode((prev) => !prev)}
        >
          {isGayMode ? 'reversed' : 'default'}
        </button>
      </h1>

      {/* Dictionary Selector */}
      <div className='flex gap-4 items-center'>
        <label htmlFor='dictionary'>dictionary:</label>
        <input
          id='dictionary'
          className='bg-eigengrau rounded-md py-2 px-4 text-stone-300 outline-none'
          type='text'
          value={dictionary}
          onChange={changeDictionary}
        />

        <button
          onClick={() => setLastVisitedDictionaryTitle(dictionary)}
          className='hover:border-stone-500 hover:text-stone-400 lowercase w-fit px-4 py-2 border-2 rounded-md border-stone-400 text-stone-300'
        >
          <Link to={`/dictionary/${dictionary}`}>go</Link>
        </button>
      </div>
      <div className='flex flex-wrap gap-4'>
        {visibleDictionaries.map((dictionary, i) => (
          <Link
            key={dictionary + i}
            className='underline underline-offset-4 text-stone-400 hover:text-stone-500'
            onClick={() => setLastVisitedDictionaryTitle(dictionary)}
            to={`/dictionary/${dictionary}`}
          >
            {dictionary}
          </Link>
        ))}
        {visitedDictionaries.length > 3 && (
          <button
            onClick={() => setIsShortList(!isShortList)}
            className='text-stone-400 hover:text-stone-500'
          >
            {isShortList ? '...' : '<'}
          </button>
        )}
      </div>

      {/* Main Picker */}
      <div className='flex gap-4 justify-center flex-col items-center w-full flex-1'>
        <div className='flex items-center'>
          {chosenWord ? (
            <>
              <button
                onClick={revealAnswerWord}
                className={`hover:border-stone-500 hover:text-stone-400 px-4 py-2 text-xl text-stone-300`}
              >
                {isGayMode ? chosenWord?.japanese : chosenWord?.original}
              </button>
              {isAnswerRevealed && (
                <p className={`text-center text-xl`}>
                  {' '}
                  -- {isGayMode ? chosenWord?.original : chosenWord?.japanese}
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

        <div className='flex gap-4 flex-col align-center justify-center'>
          <form
            action=''
            onSubmit={addWordPair}
            className='flex gap-4 items-center'
          >
            <input
              id='words'
              ref={inputRef}
              className='bg-eigengrau rounded-md py-2 px-4 text-stone-300 outline-none'
              type='text'
              value={wordPair}
              onChange={changeWords}
            />
            <button
              type='submit'
              className='hover:border-stone-500 hover:text-stone-400 lowercase px-4 py-2 border-2 rounded-md border-stone-400 text-stone-300'
            >
              add
            </button>
          </form>
          <div className='flex gap-4 justify-center'>
            <button
              onClick={getRandomWord}
              className='hover:border-stone-500 hover:text-stone-400 lowercase w-fit px-4 py-2 border-2 rounded-md border-stone-400 text-stone-300'
            >
              get random word / {wordPairs.length}
            </button>
          </div>
        </div>
      </div>

      {/* Hints */}
      <div className='mt-4'>
        <label
          htmlFor='words'
          className='gap-4 lowercase flex flex-col items-center text-center'
        >
          <p>
            Input your words separated with spaces.
            <br />
            Enter 2 words and press <b>{'<Enter>'}</b>
          </p>
          <p>Click on selected word to reveal the answer</p>
        </label>
      </div>
    </>
  );
}
