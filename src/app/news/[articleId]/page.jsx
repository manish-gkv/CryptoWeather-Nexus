'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';

import {newsData} from '../../../constants/urls.jsx';

export default function Page() {

  const {articleId} = useParams();

  const [article, setArticle] = useState(null);
  
  const NEWS_DATA_API = process.env.NEXT_PUBLIC_NEWS_DATA_API;

  useEffect(()=>{
    async function fetchArticle(){
      const response = await fetch(`${newsData}${NEWS_DATA_API}&id=${articleId}`);
      const json = await response.json();
      setArticle((prev)=>json.results[0]);

    }
    fetchArticle();
  },[articleId]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy \'at\' HH:mm');
  };

  if(!article) return <h1>Loading...</h1>

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/news" 
          className="mb-6 inline-flex items-center text-primary-green hover:text-[#31513f] transition-colors"
        >
          ← Back to News
        </Link>

        {/* Article Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Article Image */}
          {article.image_url && (
            <img 
              src={article.image_url}
              alt={article.title}
              className="w-full h-64 object-cover"
            />
          )}

          {/* Article Content */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Title and Source */}
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                {article.title}
              </h1>
              
              <div className="flex items-center gap-4 text-gray-600">
                {article.source_icon && (
                  <img 
                    src={article.source_icon}
                    alt={article.source_name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium">{article.source_name}</p>
                  <p className="text-sm">
                    {formatDate(article.pubDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              {article.content && article.content !== "ONLY AVAILABLE IN PAID PLANS" ? (
                <p className="text-gray-700 leading-relaxed">
                  {article.content}
                </p>
              ) : (
                <div className="bg-gray-100 p-4 rounded-lg text-gray-600">
                  Article content available in premium subscription
                </div>
              )}

              {/* Keywords */}
              {article.keywords?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((keyword) => (
                    <span 
                      key={keyword}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Source Info */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col md:flex-row justify-between gap-4 text-gray-600">
                <div>
                  <p className="font-medium mb-1">Source Information</p>
                  <a 
                    href={article.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-green hover:text-[#31513f]"
                  >
                    {article.source_url}
                  </a>
                </div>
                {article.category?.length > 0 && (
                  <div>
                    <p className="font-medium mb-1">Categories</p>
                    <p className="capitalize">{article.category.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}