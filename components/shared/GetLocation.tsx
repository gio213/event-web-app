import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { atom, useAtom } from "jotai";
import { useFormContext } from "react-hook-form";
import { LoadingSpinner } from "./Spinner";

// Define atomLocation atom
export const atomLocation = atom("");

// GetLocation component to fetch and update location
const GetLocation = () => {
  const [location, setLocation] = useAtom(atomLocation);
  const { setValue } = useFormContext();
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Use Google Maps Geocoding API to get the city, country, and street
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );

        if (response.data.results[0]) {
          const formattedAddress = response.data.results[0].formatted_address;
          setLocation(formattedAddress);
          setValue("location", formattedAddress);
        }

        setLoading(false);
      });
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner className="text-gray-500" />
      ) : (
        <Image
          className="cursor-pointer animate-pulse"
          onClick={getLocation}
          src="/assets/icons/location-grey.svg"
          alt="location icon"
          width={24}
          height={24}
        />
      )}
    </>
  );
};

export default GetLocation;
