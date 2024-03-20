import { WordPair } from './types';

const keyed = (dict: string) => `dictionary-${dict}`;

export const getDictionary = (dict: string) => {
  return JSON.parse(localStorage.getItem(keyed(dict)) || '[]') as WordPair[];
};

export const addWordPairToDictionary = (wordPair: WordPair, dict: string) => {
  const dictionary = JSON.parse(
    localStorage.getItem(keyed(dict)) || '[]'
  ) as WordPair[];

  localStorage.setItem(keyed(dict), JSON.stringify([...dictionary, wordPair]));
};

export const updateDictionary = (wordPairs: WordPair[], dict: string) => {
  localStorage.setItem(keyed(dict), JSON.stringify(wordPairs));
};
