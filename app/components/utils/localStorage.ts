import { WordPair } from './types';

const keyed = (dict: string) => `dictionary-${dict}`;

export const getDictionary = (dict: string) => {
  return JSON.parse(localStorage.getItem(keyed(dict)) || '[]') as WordPair[];
};
export const updateDictionary = (wordPairs: WordPair[], dict: string) => {
  localStorage.setItem(keyed(dict), JSON.stringify(wordPairs));
};

export const getLastVisitedDictionaryTitle = () => {
  const dictionaries = JSON.parse(
    localStorage.getItem('visited-dictionaries') || '[]'
  ) as string[];

  return dictionaries.length > 0 ? dictionaries[0] : 'default';
};
export const getVisitedDictionaries = () => {
  return JSON.parse(
    localStorage.getItem('visited-dictionaries') || '[]'
  ) as string[];
};
export const setLastVisitedDictionaryTitle = (title: string) => {
  const dictionaries = JSON.parse(
    localStorage.getItem('visited-dictionaries') || '[]'
  ) as string[];

  return localStorage.setItem(
    'visited-dictionaries',
    JSON.stringify(Array.from(new Set([title, ...dictionaries])))
  );
};

export const addWordPairToDictionary = (wordPair: WordPair, dict: string) => {
  const dictionary = JSON.parse(
    localStorage.getItem(keyed(dict)) || '[]'
  ) as WordPair[];

  localStorage.setItem(keyed(dict), JSON.stringify([...dictionary, wordPair]));
};
