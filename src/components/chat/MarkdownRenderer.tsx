import React, { JSX } from 'react';

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    const renderMarkdown = (text: string) => {
        const lines = text.trim().split('\n');
        let inCodeBlock = false;
        let codeBlockContent = '';
        let tableHeaders: string[] = [];
        
        return lines.reduce((elements: JSX.Element[], line, index) => {
            // Handle code blocks
            if (line.trim().startsWith('```')) {
                if (!inCodeBlock) {
                    inCodeBlock = true;
                    codeBlockContent = '';
                    return elements;
                } else {
                    inCodeBlock = false;
                    const element = (
                        <pre key={index} className="bg-gray-100 p-3 rounded-md my-2 overflow-x-auto">
                            <code>{codeBlockContent.trim()}</code>
                        </pre>
                    );
                    return [...elements, element];
                }
            }
            
            if (inCodeBlock) {
                codeBlockContent += line + '\n';
                return elements;
            }

            // Process horizontal rules
            if (line.trim().match(/^(-{3,}|\*{3,}|_{3,})$/)) {
                return [...elements, <hr key={index} className="my-4 border-t border-gray-300" />];
            }
            
            // Process headers with consistent typography
            if (line.trim().startsWith('#')) {
                const match = line.trim().match(/^#+/);
                const level = match ? match[0].length : 0;
                const content = line.trim().replace(/^#+\s/, '');
                const className = `${
                    level === 1 ? 'text-title' : 
                    level === 2 ? 'text-heading' : 
                    level === 3 ? 'text-body-medium' : 
                    'text-body-regular'
                } ${level === 1 ? 'mt-6 mb-4' : 'mt-4 mb-2'}`;
                return [...elements, <div key={index} className={className}>{content}</div>];
            }
            
            // Process ordered lists with nested content
            const orderedListMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
            if (orderedListMatch) {
                const [, number, content] = orderedListMatch;
                const match = line.match(/^\s*/);
                const indentation = match ? Math.floor(match[0].length / 2) : 0;
                
                // Process the content through inline formatting before rendering the list item
                const formattedContent = processInlineFormatting(content);
                
                return [...elements, (
                    <div key={index} className={`flex items-start ml-${indentation * 4} my-1 text-body-regular`}>
                        <span className="mr-2 min-w-[1.5rem] text-body-medium">{number}.</span>
                        <div className="flex-1">{formattedContent}</div>
                    </div>
                )];
            }

            // Process lists with consistent typography
            if (line.trim().match(/^[-*]\s/)) {
                const content = line.trim().replace(/^[-*]\s/, '');
                const match = line.match(/^\s*/);
                const indentation = match ? Math.floor(match[0].length / 2) : 0;
                return [...elements, (
                    <div key={index} className={`ml-${indentation * 4} flex items-center my-0.5 text-body-regular`}>
                        <span className="mr-2 text-gray-500">•</span>
                        {processInlineFormatting(content)}
                    </div>
                )];
            }

            // Process tables with consistent typography
            if (line.includes('|')) {
                const cells = line.split('|').filter(cell => cell.trim());
                const isHeaderRow = line.includes('|-');
                
                if (isHeaderRow) {
                    tableHeaders = elements[elements.length - 1].props.children.map(
                        (cell: JSX.Element) => cell.props.children.props.__html
                    );
                    return elements;
                }
                
                const tableRow = (
                    <div key={index} className="flex border-b border-gray-200">
                        {cells.map((cell, cellIndex) => (
                            <div 
                                key={cellIndex} 
                                className={`flex-1 p-2 ${tableHeaders.length > 0 ? 'text-body-regular' : 'text-body-medium'}`}
                            >
                                {processInlineFormatting(cell.trim())}
                            </div>
                        ))}
                    </div>
                );
                
                return [...elements, tableRow];
            }
            
            // Process blockquotes
            if (line.trim().startsWith('>')) {
                const content = line.trim().replace(/^>\s?/, '');
                return [...elements, (
                    <div key={index} className="border-l-4 border-gray-300 pl-4 my-4 italic text-body-regular">
                        {processInlineFormatting(content)}
                    </div>
                )];
            }
            
            // Default paragraph rendering
            if (line.trim()) {
                return [...elements, <div key={index} className="my-1 text-body-regular">{processInlineFormatting(line)}</div>];
            }
            
            // Smaller empty line spacing
            return [...elements, <div key={index} className="h-2" />];
        }, []);
    };

    const processInlineFormatting = (text: string) => {
        // Create a temporary placeholder for code blocks
        const codeBlocks: string[] = [];
        text = text.replace(/`([^`]+)`/g, (match) => {
            codeBlocks.push(match);
            return `%%CODE${codeBlocks.length - 1}%%`;
        });

        // Process bold text with both ** and __ syntax
        text = text.replace(/(\*\*|__)((?:[^*_]|\*(?!\*)|_(?!_))+?)\1/g, '<strong>$2</strong>');
        
        // Process italic with both * and _ syntax
        text = text.replace(/(\*|_)((?:[^*_]|\*(?!\*)|_(?!_))+?)\1/g, '<em>$2</em>');
        
        // Process strikethrough
        text = text.replace(/~~((?:[^~]|~(?!~))+?)~~/g, '<del class="text-gray-500">$1</del>');
        
        // Restore code blocks
        text = text.replace(/%%CODE(\d+)%%/g, (_, index) => {
            const code = codeBlocks[parseInt(index)];
            return `<code class="bg-gray-100 px-1 rounded font-mono text-body-regular-12">${code.slice(1, -1)}</code>`;
        });

        // Process links and images (unchanged)
        text = text.replace(/\[((?:(?!\]).)*?)\]\(((?:(?!\)).)*?)(?:\s+"(.*?)")?\)/g, 
            (_, text, url, title) => `<a href="${url}" title="${title || ''}" class="text-blue-500 hover:underline">${text}</a>`
        );
        
        text = text.replace(/!\[((?:(?!\]).)*?)\]\(((?:(?!\)).)*?)(?:\s+"(.*?)")?\)/g,
            (_, alt, src, title) => `<img src="${src}" alt="${alt}" title="${title || ''}" class="inline-block max-h-96 rounded">`
        );

        return <div dangerouslySetInnerHTML={{ __html: text }} />;
    };

    return (
        <div className="prose max-w-none text-body-regular">
            {renderMarkdown(content)}
        </div>
    );
};

export default MarkdownRenderer;