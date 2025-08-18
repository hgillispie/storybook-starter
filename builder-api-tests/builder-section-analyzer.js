import axios from 'axios';

class BuilderSectionAnalyzer {
    constructor(publicKey) {
        this.publicKey = publicKey;
        this.baseUrl = 'https://cdn.builder.io/api/v3/content';
    }
    
    /**
     * Get all sections on a specific page
     */
    async getSectionsOnPage(pageUrl) {
        const query = { 'data.url': pageUrl };
        const queryString = encodeURIComponent(JSON.stringify(query));
        const apiUrl = `${this.baseUrl}/page?apiKey=${this.publicKey}&query=${queryString}&limit=1`;
        
        const response = await axios.get(apiUrl);
        
        if (response.data?.results?.length > 0) {
            const page = response.data.results[0];
            return this.extractSections(page);
        }
        
        return null;
    }
    
    /**
     * Find all pages containing a specific section
     */
    async findPagesWithSection(sectionName, limit = 100) {
        const query = {
            'data.blocks': {
                '$elemMatch': {
                    'component.name': sectionName
                }
            }
        };
        
        const queryString = encodeURIComponent(JSON.stringify(query));
        const apiUrl = `${this.baseUrl}/page?apiKey=${this.publicKey}&query=${queryString}&limit=${limit}`;
        
        const response = await axios.get(apiUrl);
        
        if (response.data?.results) {
            return response.data.results.map(page => ({
                name: page.name,
                url: page.data?.url,
                id: page.id,
                sections: this.extractSections(page)
            }));
        }
        
        return [];
    }
    
    /**
     * Get all unique section types across all pages
     */
    async getAllSectionTypes(limit = 100) {
        const apiUrl = `${this.baseUrl}/page?apiKey=${this.publicKey}&limit=${limit}`;
        const response = await axios.get(apiUrl);
        
        const sectionTypes = new Set();
        
        if (response.data?.results) {
            response.data.results.forEach(page => {
                if (page.data?.blocks) {
                    page.data.blocks.forEach(block => {
                        const type = block.component?.name || block['@type'];
                        if (type) sectionTypes.add(type);
                    });
                }
            });
        }
        
        return Array.from(sectionTypes);
    }
    
    /**
     * Helper to extract sections from a page
     */
    extractSections(page) {
        const sections = [];
        
        if (page.data?.blocks) {
            page.data.blocks.forEach((block, index) => {
                sections.push({
                    index: index,
                    type: block.component?.name || block['@type'] || 'custom',
                    id: block.id,
                    properties: block.component?.options || {}
                });
            });
        }
        
        return sections;
    }
}

// Export for use in other scripts
export default BuilderSectionAnalyzer;

// Example usage
const analyzer = new BuilderSectionAnalyzer('f2f3655202764523914b8dbf61505ee8');

// Example 1: Get sections on homepage
analyzer.getSectionsOnPage('/').then(sections => {
    console.log('Homepage sections:', sections);
});

// Example 2: Find pages with a specific section
analyzer.findPagesWithSection('Text').then(pages => {
    console.log(`Found ${pages.length} pages with Text section`);
});

// Example 3: Get all section types
analyzer.getAllSectionTypes().then(types => {
    console.log('All section types:', types);
});