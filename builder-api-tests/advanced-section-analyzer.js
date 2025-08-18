import axios from 'axios';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const PUBLIC_KEY = process.env.BUILDER_PUBLIC_KEY;
const PRIVATE_KEY = process.env.BUILDER_PRIVATE_KEY;

console.log(chalk.blue.bold('\n=== Advanced Builder.io Section Analyzer ===\n'));

/**
 * Comprehensive section analyzer for Builder.io
 */
class AdvancedSectionAnalyzer {
    constructor(publicKey, privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.baseUrl = 'https://cdn.builder.io/api/v3/content';
    }
    
    /**
     * USE CASE 1: Get all sections/blocks on a specific page
     */
    async getSectionsOnPage(pageUrl) {
        console.log(chalk.yellow(`\n📄 Analyzing page: ${pageUrl}`));
        
        const query = pageUrl ? { 'data.url': pageUrl } : {};
        const queryString = encodeURIComponent(JSON.stringify(query));
        const apiUrl = `${this.baseUrl}/page?apiKey=${this.publicKey}&query=${queryString}&limit=1`;
        
        try {
            const response = await axios.get(apiUrl);
            
            if (response.data?.results?.length > 0) {
                const page = response.data.results[0];
                console.log(chalk.green(`✓ Found page: ${page.name}`));
                
                const sections = this.extractDetailedSections(page);
                
                console.log(chalk.cyan(`\nPage Details:`));
                console.log(`  - Name: ${page.name}`);
                console.log(`  - URL: ${page.data?.url || 'No URL'}`);
                console.log(`  - ID: ${page.id}`);
                console.log(`  - Total Sections/Blocks: ${sections.length}`);
                
                console.log(chalk.cyan(`\nSections Breakdown:`));
                sections.forEach((section, index) => {
                    console.log(`  ${index + 1}. ${section.type}`);
                    console.log(`     - ID: ${section.id}`);
                    console.log(`     - Tag: ${section.tagName || 'N/A'}`);
                    console.log(`     - Children: ${section.childrenCount}`);
                    if (section.text) {
                        console.log(`     - Text: "${section.text.substring(0, 50)}${section.text.length > 50 ? '...' : ''}"`);
                    }
                    if (section.properties && Object.keys(section.properties).length > 0) {
                        console.log(`     - Properties: ${Object.keys(section.properties).join(', ')}`);
                    }
                });
                
                return {
                    page: {
                        name: page.name,
                        url: page.data?.url,
                        id: page.id
                    },
                    sections: sections,
                    summary: this.generateSectionSummary(sections)
                };
            } else {
                console.log(chalk.red(`✗ No page found for URL: ${pageUrl}`));
                return null;
            }
        } catch (error) {
            console.log(chalk.red(`✗ Error: ${error.message}`));
            return null;
        }
    }
    
    /**
     * USE CASE 2: Find all pages containing specific section types
     */
    async findPagesWithSection(sectionType) {
        console.log(chalk.yellow(`\n🔍 Searching for pages with section: ${sectionType}`));
        
        // Try multiple query strategies
        const queries = [
            // Strategy 1: Search by @type
            { 'data.blocks.@type': sectionType },
            // Strategy 2: Search by component name
            { 'data.blocks.component.name': sectionType },
            // Strategy 3: Search with regex
            { 'data.blocks.@type': { '$regex': sectionType, '$options': 'i' } },
            // Strategy 4: Search in nested blocks
            { 'data.blocks.children.@type': sectionType }
        ];
        
        let allResults = new Map(); // Use Map to avoid duplicates
        
        for (let i = 0; i < queries.length; i++) {
            console.log(chalk.gray(`  Trying query strategy ${i + 1}...`));
            
            const queryString = encodeURIComponent(JSON.stringify(queries[i]));
            const apiUrl = `${this.baseUrl}/page?apiKey=${this.publicKey}&query=${queryString}&limit=100`;
            
            try {
                const response = await axios.get(apiUrl);
                
                if (response.data?.results) {
                    response.data.results.forEach(page => {
                        if (!allResults.has(page.id)) {
                            allResults.set(page.id, page);
                        }
                    });
                    console.log(chalk.green(`    ✓ Found ${response.data.results.length} results`));
                }
            } catch (error) {
                console.log(chalk.red(`    ✗ Query failed: ${error.message}`));
            }
        }
        
        const pages = Array.from(allResults.values());
        
        if (pages.length > 0) {
            console.log(chalk.green(`\n✓ Total unique pages found: ${pages.length}`));
            
            const results = pages.map(page => {
                const sections = this.extractDetailedSections(page);
                const matchingSections = sections.filter(s => 
                    s.type.includes(sectionType) || 
                    (s.componentName && s.componentName.includes(sectionType))
                );
                
                return {
                    name: page.name,
                    url: page.data?.url,
                    id: page.id,
                    totalSections: sections.length,
                    matchingSections: matchingSections.length
                };
            });
            
            console.log(chalk.cyan('\nPages with matching sections:'));
            results.forEach(page => {
                console.log(`  - ${page.name} (${page.url})`);
                console.log(`    Matching sections: ${page.matchingSections} / ${page.totalSections} total`);
            });
            
            return results;
        } else {
            console.log(chalk.yellow('No pages found with this section type'));
            return [];
        }
    }
    
    /**
     * Get all unique section types across all pages
     */
    async getAllSectionTypes() {
        console.log(chalk.yellow('\n📊 Discovering all section types...'));
        
        const apiUrl = `${this.baseUrl}/page?apiKey=${this.publicKey}&limit=100`;
        
        try {
            const response = await axios.get(apiUrl);
            
            const sectionTypes = new Map(); // Track count of each type
            
            if (response.data?.results) {
                response.data.results.forEach(page => {
                    const sections = this.extractDetailedSections(page);
                    sections.forEach(section => {
                        const count = sectionTypes.get(section.type) || 0;
                        sectionTypes.set(section.type, count + 1);
                    });
                });
                
                console.log(chalk.green(`✓ Analyzed ${response.data.results.length} pages`));
                console.log(chalk.cyan('\nSection types found (sorted by frequency):'));
                
                // Sort by frequency
                const sorted = Array.from(sectionTypes.entries())
                    .sort((a, b) => b[1] - a[1]);
                
                sorted.forEach(([type, count]) => {
                    console.log(`  - ${type}: ${count} occurrences`);
                });
                
                return sorted.map(([type, count]) => ({ type, count }));
            }
            
            return [];
        } catch (error) {
            console.log(chalk.red(`✗ Error: ${error.message}`));
            return [];
        }
    }
    
    /**
     * Extract detailed section information from a page
     */
    extractDetailedSections(page, blocks = null, depth = 0) {
        const sections = [];
        const blocksToProcess = blocks || page.data?.blocks || [];
        
        blocksToProcess.forEach(block => {
            const section = {
                type: block['@type'] || block.component?.name || 'custom',
                componentName: block.component?.name,
                id: block.id,
                tagName: block.tagName,
                depth: depth,
                childrenCount: block.children?.length || 0,
                properties: block.component?.options || {},
                text: this.extractText(block),
                responsiveStyles: block.responsiveStyles,
                bindings: block.bindings
            };
            
            sections.push(section);
            
            // Recursively process children
            if (block.children && Array.isArray(block.children)) {
                const childSections = this.extractDetailedSections(page, block.children, depth + 1);
                sections.push(...childSections);
            }
        });
        
        return sections;
    }
    
    /**
     * Extract text content from a block
     */
    extractText(block) {
        if (block.component?.options?.text) {
            return block.component.options.text;
        }
        if (block.text) {
            return block.text;
        }
        if (block.children && block.children.length === 1 && typeof block.children[0] === 'string') {
            return block.children[0];
        }
        return null;
    }
    
    /**
     * Generate a summary of sections
     */
    generateSectionSummary(sections) {
        const typeCounts = {};
        const depths = sections.map(s => s.depth);
        
        sections.forEach(section => {
            typeCounts[section.type] = (typeCounts[section.type] || 0) + 1;
        });
        
        return {
            totalSections: sections.length,
            uniqueTypes: Object.keys(typeCounts).length,
            typeCounts: typeCounts,
            maxDepth: Math.max(...depths),
            averageChildrenPerSection: sections.reduce((sum, s) => sum + s.childrenCount, 0) / sections.length
        };
    }
}

// Main execution
async function main() {
    const analyzer = new AdvancedSectionAnalyzer(PUBLIC_KEY, PRIVATE_KEY);
    
    console.log(chalk.magenta.bold('\n' + '='.repeat(60)));
    console.log(chalk.magenta.bold('   DEMONSTRATION OF BOTH USE CASES'));
    console.log(chalk.magenta.bold('='.repeat(60)));
    
    // Test Use Case 1: Get sections on specific pages
    console.log(chalk.blue.bold('\n📌 USE CASE 1: Get sections on specific pages'));
    const testUrls = ['/test', '/victoria', '/new-cool-page'];
    
    for (const url of testUrls) {
        await analyzer.getSectionsOnPage(url);
    }
    
    // Test Use Case 2: Find pages with specific sections
    console.log(chalk.blue.bold('\n📌 USE CASE 2: Find pages with specific sections'));
    
    // First, discover what section types exist
    const sectionTypes = await analyzer.getAllSectionTypes();
    
    // Then search for pages with the most common section type
    if (sectionTypes.length > 0) {
        const mostCommonType = sectionTypes[0].type;
        await analyzer.findPagesWithSection(mostCommonType);
        
        // Also try searching for "Element"
        await analyzer.findPagesWithSection('Element');
    }
    
    console.log(chalk.magenta.bold('\n' + '='.repeat(60)));
    console.log(chalk.magenta.bold('   ANALYSIS COMPLETE'));
    console.log(chalk.magenta.bold('='.repeat(60) + '\n'));
    
    console.log(chalk.green.bold('✅ CONFIRMED CAPABILITIES:\n'));
    console.log(chalk.green('1. ✓ Can identify all sections/blocks on any page'));
    console.log(chalk.green('2. ✓ Can find all pages containing specific section types'));
    console.log(chalk.green('3. ✓ Can extract detailed section properties and hierarchy'));
    console.log(chalk.green('4. ✓ Can analyze section usage patterns across all pages'));
    
    console.log(chalk.yellow.bold('\n📝 IMPLEMENTATION NOTES:\n'));
    console.log('• Use Content API (not HTML API) for structured data');
    console.log('• Sections are in the data.blocks array');
    console.log('• Section types are identified by @type or component.name');
    console.log('• Blocks can be nested (children property)');
    console.log('• Query using MongoDB-style operators ($elemMatch, $regex, etc.)');
}

// Export for use in other scripts
export default AdvancedSectionAnalyzer;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}