'use client';

import ReactMarkdown from 'react-markdown';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

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
  
  // Custom components for ReactMarkdown
  const components: Components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      
      return !inline ? (
        <div className="my-6 rounded-lg overflow-hidden border border-gray-700">
          <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono border-b border-gray-700 flex items-center justify-between">
            <span>{language || 'code'}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
              }}
              className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors"
              title="Copy code"
            >
              Copy
            </button>
          </div>
          <SyntaxHighlighter
            {...props}
            style={vscDarkPlus}
            language={language}
            PreTag="div"
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              background: '#1e1e1e',
            }}
            codeTagProps={{
              style: {
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              }
            }}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="px-1.5 py-0.5 bg-gray-800 text-blue-400 rounded text-sm font-mono border border-gray-700" {...props}>
          {children}
        </code>
      );
    },
    p({ children }) {
      return <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>;
    },
    h1({ children }) {
      return <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>;
    },
    h2({ children }) {
      return <h2 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h2>;
    },
    h3({ children }) {
      return <h3 className="text-xl font-bold text-white mt-5 mb-2">{children}</h3>;
    },
    ul({ children }) {
      return <ul className="list-disc list-inside mb-4 text-gray-300 space-y-2 ml-4">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-2 ml-4">{children}</ol>;
    },
    blockquote({ children }) {
      return (
        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 text-gray-300 italic bg-gray-900/50">
          {children}
        </blockquote>
      );
    },
    a({ href, children }) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          {children}
        </a>
      );
    },
    img({ src, alt }) {
      return (
        <div className="my-6">
          <img
            src={src}
            alt={alt || ''}
            className="w-full max-w-3xl mx-auto rounded-lg border border-gray-700"
            loading="lazy"
          />
        </div>
      );
    },
    table({ children }) {
      return (
        <div className="my-6 overflow-x-auto">
          <table className="min-w-full border border-gray-700">
            {children}
          </table>
        </div>
      );
    },
    thead({ children }) {
      return <thead className="bg-gray-800">{children}</thead>;
    },
    th({ children }) {
      return <th className="px-4 py-2 border border-gray-700 text-left text-white font-semibold">{children}</th>;
    },
    td({ children }) {
      return <td className="px-4 py-2 border border-gray-700 text-gray-300">{children}</td>;
    },
  };
  
  // Split content by Google Drive markers and render appropriately
  const renderContent = () => {
    const parts = processedContent.split(/\[GDRIVE:([a-zA-Z0-9_-]+)\]/);
    
    return parts.map((part, index) => {
      // Even indices are regular markdown, odd indices are Google Drive IDs
      if (index % 2 === 0) {
        // Regular markdown content
        if (!part.trim()) return null;
        return (
          <div key={index} className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={components}
            >
              {part}
            </ReactMarkdown>
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
