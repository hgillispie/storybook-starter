import axios from 'axios';

const PUBLIC_KEY = 'f2f3655202764523914b8dbf61505ee8';

/**
 * Use Case 2: Find all pages containing a specific section
 */
async function findPagesWithSection(sectionName) {
    const query = {
        'data.blocks': {
            '$elemMatch': {
                'component.name': sectionName
            }
        }
    };
    
    const queryString = encodeURIComponent(JSON.stringify(query));
    const apiUrl = `https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&query=${queryString}&limit=100`;
    
    try {
        const response = await axios.get(apiUrl);
        
        if (response.data?.results) {
            const pages = response.data.results.map(page => {
                // Count how many times this section appears on the page
                let sectionCount = 0;
                if (page.data?.blocks) {
                    sectionCount = page.data.blocks.filter(block => 
                        block.component?.name === sectionName
                    ).length;
                }
                
                return {
                    name: page.name || 'Unnamed',
                    url: page.data?.url || 'No URL',
                    sectionCount: sectionCount,
                    id: page.id
                };
            });
            
            return {
                sectionSearched: sectionName,
                totalPagesFound: pages.length,
                pages: pages
            };
        }
        
        return null;
    } catch (error) {
        console.error('Error finding pages with section:', error.message);
        return null;
    }
}

// Example usage - replace 'Text' with your section name
findPagesWithSection('Text').then(result => {
    if (result) {
        console.log('Section Searched:', result.sectionSearched);
        console.log('Total Pages Found:', result.totalPagesFound);
        console.log('\nPages:');
        result.pages.forEach(page => {
            console.log(`  - ${page.name} (${page.url}) - ${page.sectionCount} instances`);
        });
    }
});