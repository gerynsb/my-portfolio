'use client';

import ReactMarkdown from 'react-markdown';
import { useMemo, useState } from 'react';
import Image from 'next/image';

interface ArticleContentProps {
  content: string;
}

// Function to extract Google Drive file ID
function extractGoogleDriveId(url: string): string | null {
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

// Function to check if URL is an image
function isImageUrl(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|svg|bmp|avif)(\?.*)?$/i.test(url);
}

// Custom image component for Google Drive with fallback
function GoogleDriveImage({ fileId, alt }: { fileId: string; alt: string }) {
  const [error, setError] = useState(false);
  
  // Try multiple Google Drive URL formats
  const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  const iframeUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  
  if (error) {
    return (
      <div className="my-6 w-full max-w-3xl mx-auto">
        <iframe
          src={iframeUrl}
          className="w-full h-96 rounded-lg border border-gray-700"
          allow="autoplay"
          title={alt}
        />
        <p className="text-center text-sm text-gray-400 mt-2">
          <a 
            href={`https://drive.google.com/file/d/${fileId}/view`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            Buka gambar di Google Drive
          </a>
        </p>
      </div>
    );
  }
  
  return (
    <div className="my-6 w-full max-w-3xl mx-auto">
      <img
        src={thumbnailUrl}
        alt={alt}
        className="w-full rounded-lg border border-gray-700"
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
}

// Process content to convert standalone URLs to custom components
function processContent(content: string): string {
  const lines = content.split('\n');
  const processedLines = lines.map(line => {
    const trimmedLine = line.trim();
    
    // Check if line is a standalone URL (not in markdown syntax)
    if (trimmedLine.startsWith('http') && !trimmedLine.includes('](') && !trimmedLine.includes('![')) {
      // Check for Google Drive link
      if (trimmedLine.includes('drive.google.com/file/d/')) {
        const fileId = extractGoogleDriveId(trimmedLine);
        if (fileId) {
          // Use special marker that we'll replace with component
          return `[GDRIVE:${fileId}]`;
        }
      }
      
      // Check for direct image URL
      if (isImageUrl(trimmedLine)) {
        return `![Image](${trimmedLine})`;
      }
    }
    
    return line;
  });
  
  return processedLines.join('\n');
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const processedContent = useMemo(() => processContent(content), [content]);
  
  // Split content by Google Drive markers and render appropriately
  const renderContent = () => {
    const parts = processedContent.split(/\[GDRIVE:([a-zA-Z0-9_-]+)\]/);
    
    return parts.map((part, index) => {
      // Even indices are regular markdown, odd indices are Google Drive IDs
      if (index % 2 === 0) {
        // Regular markdown content
        if (!part.trim()) return null;
        return (
          <div key={index} className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white
            prose-p:text-gray-300
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
            prose-strong:text-white
            prose-code:text-blue-400 prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700
            prose-img:rounded-lg prose-img:border prose-img:border-gray-700 prose-img:w-full prose-img:max-w-3xl prose-img:mx-auto prose-img:my-6
            prose-blockquote:border-blue-500 prose-blockquote:text-gray-300
            prose-ul:text-gray-300
            prose-ol:text-gray-300
            prose-li:text-gray-300">
            <ReactMarkdown>{part}</ReactMarkdown>
          </div>
        );
      } else {
        // Google Drive image component
        return <GoogleDriveImage key={index} fileId={part} alt="Google Drive Image" />;
      }
    });
  };
  
  return <div>{renderContent()}</div>;
}
