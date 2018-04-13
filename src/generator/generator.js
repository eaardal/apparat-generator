import path from 'path';
import fs from 'fs';
import translate from 'google-translate-api';
import { getRandomInt } from '../utils/randomUtil';

const translateNoun = async (noun) => {
  const res = await translate(noun, { to: 'no' });
  return res.text;
};

const getRandomNoun = () => {
  const nounlistPath = path.resolve(__dirname, 'data', 'nounlist.txt');
  const nounsAsString = fs.readFileSync(nounlistPath, { encoding: 'UTF-8' });
  const nouns = nounsAsString.split('\n');
  const randomIndex = getRandomInt(0, nouns.length - 1);
  return nouns[randomIndex];
};

const generateApparat = async () => {
  const noun = getRandomNoun();
  const norwegianNoun = await translateNoun(noun);
  return `${norwegianNoun}apparat`;
};

export default generateApparat;
