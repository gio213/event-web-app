"use client";
import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "./Spinner";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "./UrlPreviewSkeleton";

type UrlPreviewProps = {
  url: string;
};

export const UrlPreview = ({ url }: UrlPreviewProps) => {
  const [urlData, setUrlData] = useState<any>(null);
  const apiUrl = `https://jsonlink.io/api/extract?url=${url}&api_key=${process.env.NEXT_PUBLIC_URL_PREVIEW_API_KEY}`;

  const fetchUrlData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      setUrlData(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchUrlData();
  }, [url]);

  if (!urlData) {
    return (
      <div className="flex justify-center">
        {/* <LoadingSpinner /> */}
        <Skeleton />
      </div>
    );
  }

  return (
    <div>
      {!urlData ? (
        <div className="max-w-md mx-auto my-4 p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {url}
          </Link>
        </div>
      ) : (
        <div className="max-w-md mx-auto my-4 p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          {urlData.images && urlData.images.length > 0 && (
            <Image
              src={urlData.images[0]}
              alt={urlData.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
          <div className="mt-4">
            <h2 className="text-xl font-bold">{urlData.title}</h2>
            <p className="text-gray-700">{urlData.description}</p>
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mt-2 inline-block"
            >
              <p className="text-primary-500">{url}</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlPreview;
