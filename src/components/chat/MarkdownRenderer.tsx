import React from 'react';

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    const renderMarkdown = (text: string) => {
        const lines = text.trim().split('\n');
        
        return lines.map((line, index) => {
            // Process headers
            if (line.trim().startsWith('#')) {
                const match = line.trim().match(/^#+/);
                const level = match ? match[0].length : 0;
                const content = line.trim().replace(/^#+\s/, '');
                const className = `text-${level === 1 ? '3xl' : level === 2 ? '2xl' : level === 3 ? 'xl' : 'lg'} font-bold my-4`;
                return <div key={index} className={className}>{content}</div>;
            }
            
            // Process lists
            if (line.trim().match(/^[-*]\s/)) {
                const content = line.trim().replace(/^[-*]\s/, '');
                const match = line.match(/^\s*/);
                const indentation = match ? match[0].length : 0;
                const className = `ml-${Math.floor(indentation/2)} flex items-center`;
                return (
                    <div key={index} className={className}>
                        <span className="mr-2">•</span>
                        {processInlineFormatting(content)}
                    </div>
                );
            }
            
            // Process ordered lists
            if (line.trim().match(/^\d+\.\s/)) {
                const content = line.trim().replace(/^\d+\.\s/, '');
                const match = line.match(/^\d+/);
                const number = match ? match[0] : '';
                return (
                    <div key={index} className="flex items-start ml-4">
                        <span className="mr-2 font-medium">{number}.</span>
                        {processInlineFormatting(content)}
                    </div>
                );
            }
            
            // Process blockquotes
            if (line.trim().startsWith('>')) {
                const content = line.trim().replace(/^>\s?/, '');
                return (
                    <div key={index} className="border-l-4 border-gray-300 pl-4 my-4 italic">
                        {processInlineFormatting(content)}
                    </div>
                );
            }
            
            // Process tables
            if (line.includes('|')) {
                const cells = line.split('|').filter(cell => cell.trim());
                const isHeader = line.includes('|-');
                
                if (isHeader) return null;
                
                return (
                    <div key={index} className="flex border-b border-gray-200">
                        {cells.map((cell, cellIndex) => (
                            <div key={cellIndex} className="flex-1 p-2">
                                {processInlineFormatting(cell.trim())}
                            </div>
                        ))}
                    </div>
                );
            }
            
            // Default paragraph rendering
            if (line.trim()) {
                return <div key={index} className="my-2">{processInlineFormatting(line)}</div>;
            }
            
            // Empty line
            return <div key={index} className="h-4" />;
        });
    };

    const processInlineFormatting = (text: string) => {
        // Process bold
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Process italic
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // Process inline code
        text = text.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>');
        // Process strikethrough
        text = text.replace(/~~(.*?)~~/g, '<del>$1</del>');
        // Process links
        text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-500 hover:underline">$1</a>');

        return <div dangerouslySetInnerHTML={{ __html: text }} />;
    };

    return <div className="prose max-w-none">{renderMarkdown(content)}</div>;
};

export default MarkdownRenderer;