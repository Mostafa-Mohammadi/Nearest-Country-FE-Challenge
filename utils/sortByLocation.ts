import type {TCountry} from 'services/TCountries';

//-------------------------------------- Haversine formula ----------------------------------------

const sortCountries = (
  data: {countries: TCountry[]},
  userLat: string,
  userLng: string,
) => {
  const items = data.countries;
  const toRadians = angle => (angle * Math.PI) / 180;

  return items.sort((a, b) => {
    const lat1 = toRadians(userLat),
      lng1 = toRadians(userLng),
      lat2 = toRadians(a.lat),
      lng2 = toRadians(a.lng),
      lat3 = toRadians(b.lat),
      lng3 = toRadians(b.lng),
      R = 6371e3; // Earth's radius in meters

    const aDistance =
      Math.acos(
        Math.sin(lat1) * Math.sin(lat2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1),
      ) * R;

    const bDistance =
      Math.acos(
        Math.sin(lat1) * Math.sin(lat3) +
          Math.cos(lat1) * Math.cos(lat3) * Math.cos(lng3 - lng1),
      ) * R;

    return aDistance - bDistance;
  });
};

export {sortCountries};
