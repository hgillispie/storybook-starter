/**
 * SIMPLE API EXAMPLES FOR YOUR PROSPECT
 * 
 * These are straightforward, copy-paste ready examples
 * that can be integrated into any application.
 */

// ============================================
// USE CASE 1: Get sections on a specific page
// ============================================

async function getSectionsOnPage(pageUrl) {
    const PUBLIC_KEY = 'f2f3655202764523914b8dbf61505ee8';
    
    // Build the query
    const query = JSON.stringify({ 'data.url': pageUrl });
    const encodedQuery = encodeURIComponent(query);
    
    // Make the API call
    const response = await fetch(
        `https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&query=${encodedQuery}&limit=1`
    );
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
        const page = data.results[0];
        const sections = [];
        
        // Extract sections from blocks
        function extractSections(blocks, depth = 0) {
            blocks.forEach(block => {
                sections.push({
                    type: block['@type'] || block.component?.name || 'custom',
                    id: block.id,
                    depth: depth,
                    tagName: block.tagName,
                    text: block.component?.options?.text || block.text
                });
                
                // Process nested blocks
                if (block.children) {
                    extractSections(block.children, depth + 1);
                }
            });
        }
        
        if (page.data?.blocks) {
            extractSections(page.data.blocks);
        }
        
        return {
            pageName: page.name,
            pageUrl: page.data?.url,
            sections: sections
        };
    }
    
    return null;
}

// Example usage:
// const result = await getSectionsOnPage('/test');
// console.log(`Page has ${result.sections.length} sections`);


// ============================================
// USE CASE 2: Find pages with a specific section
// ============================================

async function findPagesWithSection(sectionType) {
    const PUBLIC_KEY = 'f2f3655202764523914b8dbf61505ee8';
    
    // Get all pages (you might want to paginate for large sites)
    const response = await fetch(
        `https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&limit=100`
    );
    
    const data = await response.json();
    const matchingPages = [];
    
    if (data.results) {
        data.results.forEach(page => {
            let hasSection = false;
            let count = 0;
            
            // Check if page contains the section type
            function checkForSection(blocks) {
                blocks?.forEach(block => {
                    const blockType = block['@type'] || block.component?.name;
                    if (blockType === sectionType || blockType?.includes(sectionType)) {
                        hasSection = true;
                        count++;
                    }
                    
                    // Check nested blocks
                    if (block.children) {
                        checkForSection(block.children);
                    }
                });
            }
            
            if (page.data?.blocks) {
                checkForSection(page.data.blocks);
            }
            
            if (hasSection) {
                matchingPages.push({
                    name: page.name,
                    url: page.data?.url || page.query?.[0]?.value,
                    sectionCount: count
                });
            }
        });
    }
    
    return matchingPages;
}

// Example usage:
// const pages = await findPagesWithSection('@builder.io/sdk:Element');
// console.log(`Found ${pages.length} pages with this section`);


// ============================================
// COMBINED UTILITY CLASS
// ============================================

class BuilderSectionAPI {
    constructor(publicKey) {
        this.publicKey = publicKey;
        this.baseUrl = 'https://cdn.builder.io/api/v3/content';
    }
    
    async getSectionsOnPage(pageUrl) {
        const query = JSON.stringify({ 'data.url': pageUrl });
        const url = `${this.baseUrl}/page?apiKey=${this.publicKey}&query=${encodeURIComponent(query)}&limit=1`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results?.[0]) {
            return this.extractSections(data.results[0]);
        }
        return null;
    }
    
    async findPagesWithSection(sectionType) {
        const url = `${this.baseUrl}/page?apiKey=${this.publicKey}&limit=100`;
        const response = await fetch(url);
        const data = await response.json();
        
        const results = [];
        data.results?.forEach(page => {
            const sections = this.extractSections(page);
            const matches = sections.filter(s => 
                s.type === sectionType || s.type?.includes(sectionType)
            );
            
            if (matches.length > 0) {
                results.push({
                    page: page.name,
                    url: page.data?.url,
                    matchCount: matches.length
                });
            }
        });
        
        return results;
    }
    
    extractSections(page) {
        const sections = [];
        
        const extract = (blocks, depth = 0) => {
            blocks?.forEach(block => {
                sections.push({
                    type: block['@type'] || block.component?.name,
                    id: block.id,
                    depth: depth
                });
                
                if (block.children) {
                    extract(block.children, depth + 1);
                }
            });
        };
        
        extract(page.data?.blocks);
        return sections;
    }
}

// Example usage:
// const api = new BuilderSectionAPI('f2f3655202764523914b8dbf61505ee8');
// const sections = await api.getSectionsOnPage('/test');
// const pages = await api.findPagesWithSection('Element');


// ============================================
// CURL EXAMPLES (for testing without code)
// ============================================

/*
USE CASE 1 - Get sections on a page:
curl "https://cdn.builder.io/api/v3/content/page?apiKey=f2f3655202764523914b8dbf61505ee8&query=%7B%22data.url%22%3A%22%2Ftest%22%7D&limit=1"

USE CASE 2 - Get all pages (then filter client-side):
curl "https://cdn.builder.io/api/v3/content/page?apiKey=f2f3655202764523914b8dbf61505ee8&limit=100"
*/

// Export for use in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getSectionsOnPage,
        findPagesWithSection,
        BuilderSectionAPI
    };
}