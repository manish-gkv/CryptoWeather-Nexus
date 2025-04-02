'use client';
import { useState, useEffect } from 'react';
import {newsData} from '../constants/urls.jsx';

export default function NewsSection() {

    const newsDataApi = process.env.NEXT_PUBLIC_NEWS_DATA_API;

    const [articles, setArticles] = useState([]);

    const newsDataUri = newsData + newsDataApi + "&q=crypto&size=6";

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(newsDataUri);
            const data = await response.json();

            const articleData = data.results ? .map((article) => {
                return {
                    id: article.article_id,
                    title: article.title,
                    link: article.link,
                    image: article.image_url,
                    source: article.source_name,
                    excerpt: article.description
                }
            });

            setArticles((prev) => articleData);

        }

        fetchData();

    }, []);

    return (
        <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[#31513f] mb-8">
          NewsSection
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
          key={article.id}
          className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-200 shadow-lg group"
        >
          <div className="h-48 bg-gray-100 overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <a href = {article.link}><h3 className="font-semibold mb-2 line-clamp-2 text-gray-800 group-hover:text-[#31513f] transition-colors">
              {article.title}
            </h3></a>
            <p className="text-gray-600 text-sm line-clamp-3 mb-3">
              {article.excerpt}
            </p>
            <div className="text-sm text-[#31513f] font-medium">
              Source: {article.source}
            </div>
          </div>
        </article>
        ))}
      </div>
    </div>
    );
}