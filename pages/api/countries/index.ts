import type {NextApiRequest, NextApiResponse} from 'next';
import path from 'path';
import {promises as fs} from 'fs';
import axios from 'axios';
import {sortCountries} from 'utils/sortByLocation';

//read countries from json file
const readsFile = async () => {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(
    jsonDirectory + '/countries_metadata.json',
    'utf8',
  );
  return fileContents;
};

// get user lat and lng from http://ip-api.com/json
const getLocation = async () => {
  const data = await axios('http://ip-api.com/json');
  return data.data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: {search},
  } = req;
  try {
    const resualt = await getLocation();
    const fileContents = await readsFile();
    const searchItem = JSON.parse(fileContents)?.countries.filter(item => {
      return item.name
        .toLowerCase()
        .startsWith((search as string).toLowerCase());
    });
    const data = sortCountries(
      {countries: searchItem},
      resualt.lat,
      resualt.lon,
    );
    res.status(200).json({countries: data});
  } catch (error) {
    res.status(500).json({error: 'failed to load data'});
  }
}
