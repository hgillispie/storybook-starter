import axios from 'axios';

const PUBLIC_KEY = 'f2f3655202764523914b8dbf61505ee8';

/**
 * Use Case 1: Get all sections used on a specific page
 */
async function getSectionsOnPage(pageUrl) {
    const query = { 'data.url': pageUrl };
    const queryString = encodeURIComponent(JSON.stringify(query));
    const apiUrl = `https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&query=${queryString}&limit=1`;
    
    try {
        const response = await axios.get(apiUrl);
        
        if (response.data?.results?.length > 0) {
            const page = response.data.results[0];
            const sections = [];
            
            if (page.data?.blocks) {
                page.data.blocks.forEach((block, index) => {
                    const sectionInfo = {
                        index: index,
                        type: block.component?.name || block['@type'] || 'custom',
                        id: block.id,
                        properties: block.component?.options || {}
                    };
                    sections.push(sectionInfo);
                });
            }
            
            return {
                pageName: page.name,
                pageUrl: page.data?.url,
                totalSections: sections.length,
                sections: sections
            };
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching page sections:', error.message);
        return null;
    }
}

// Example usage
getSectionsOnPage('/').then(result => {
    if (result) {
        console.log('Page:', result.pageName);
        console.log('Total Sections:', result.totalSections);
        console.log('\nSections:');
        result.sections.forEach(section => {
            console.log(`  ${section.index + 1}. ${section.type} (ID: ${section.id})`);
        });
    }
});