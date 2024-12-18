"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface RSSItem {
  link: string;
  title: string;
  description: string;
  imageUrl: string;
}

const RSS: React.FC = () => {
  const [data, setData] = useState<RSSItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://plentycred.co.in/api/v1/rss/rss-news'
        );

        const responseData = response.data['data'];
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseData, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');

        const parsedData: RSSItem[] = Array.from(items).map((item) => {
          const titleNode = item.querySelector('title');
          const titleText = titleNode ? titleNode.textContent : '';

          const linkNode = item.querySelector('link');
          const linkText = linkNode ? linkNode.textContent : '';

          const descriptionNode = item.querySelector('description');
          const descriptionText = descriptionNode ? descriptionNode.textContent : '';

          const mediaContentNode = item.querySelector('content');
          const imageUrl = mediaContentNode ? mediaContentNode.getAttribute('url') : '';

          return {
            link: linkText?.trim() || '',
            title: titleText?.trim() || '',
            description: descriptionText?.trim() || '',
            imageUrl: imageUrl?.trim() || '',
          };
        });

        setData(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="m-auto max-w-[1280px]">
      <div className="p-4">
        <h1 className="text-3xl xl:text-5xl text-[#131c23] font-bold">Blogs</h1>
        <p className="text-[#131c23] p-1">
          At EarnCharge, we understand the specific Manage finances hassle-free, invest money, pay bills, recharge phone & get amazing deals
        </p>
      </div>
      <br />
      <br />
      <div id="wrapper" className="p-4">
        <div className="grid grid-cols-1 justify-center place-content-center items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.map((item, index) => {
            // Define the maximum number of characters for description
            const maxDescriptionLength = 120; // Change this value as needed
            const minLength = 90;
            // Trim the description text if it exceeds the maximum length
            const trimmedDescription =
              item.description.length > maxDescriptionLength
                ? item.description.substring(0, maxDescriptionLength) + '...'
                : item.description;

            const truncatedTitle =
              item.title.length > minLength
                ? item.title.substring(0, minLength) + '...'
                : item.title;

            return (
              <div key={index} className="max-w-sm bg-[#f1ebe3] border border-black rounded-lg">
                <div>
                  <div>
                    <img className="rounded-t-lg" src={item.imageUrl} alt={item.title} />
                  </div>
                  <div className="p-5 flex flex-col gap-5">
                    <h5 className="font-semibold text-xl text-[#131c23]">
                      {truncatedTitle}
                    </h5>
                    <p className="font-semilight text-[14px]">
                      {trimmedDescription}
                    </p>
                    <Link href={item.link}>
                      <p className="text-blue-500 hover:underline">Read more</p>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RSS;
