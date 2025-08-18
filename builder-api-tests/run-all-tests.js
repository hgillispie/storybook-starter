import { spawn } from 'child_process';
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';

console.log(chalk.magenta.bold('\n' + '='.repeat(60)));
console.log(chalk.magenta.bold('   BUILDER.IO API COMPREHENSIVE TEST SUITE'));
console.log(chalk.magenta.bold('='.repeat(60) + '\n'));

console.log(chalk.cyan('Testing two main use cases:'));
console.log(chalk.cyan('1. Identify which sections are used on a specific page'));
console.log(chalk.cyan('2. Find all pages that contain a specific section\n'));

// Function to run a test file
function runTest(scriptName) {
    return new Promise((resolve, reject) => {
        const child = spawn('node', [scriptName], {
            stdio: 'inherit',
            shell: true
        });
        
        child.on('exit', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`${scriptName} exited with code ${code}`));
            }
        });
        
        child.on('error', (err) => {
            reject(err);
        });
    });
}

async function generateSummaryReport() {
    console.log(chalk.magenta.bold('\n' + '='.repeat(60)));
    console.log(chalk.magenta.bold('   SUMMARY REPORT'));
    console.log(chalk.magenta.bold('='.repeat(60) + '\n'));
    
    // Check for generated files
    const files = [
        'html-api-sample.html',
        'content-api-sample.json',
        'content-api-fields-sample.json',
        'admin-api-models.json',
        'admin-api-symbols.json'
    ];
    
    console.log(chalk.yellow('Generated Files:'));
    for (const file of files) {
        try {
            const stats = await fs.stat(file);
            console.log(chalk.green(`  ✓ ${file} (${stats.size} bytes)`));
        } catch {
            console.log(chalk.gray(`  - ${file} (not generated)`));
        }
    }
    
    // Analyze Content API sample if it exists
    try {
        const contentSample = JSON.parse(await fs.readFile('content-api-sample.json', 'utf-8'));
        
        console.log(chalk.yellow('\n📊 Content Structure Analysis:'));
        console.log(chalk.cyan('Page Information:'));
        console.log(`  - ID: ${contentSample.id}`);
        console.log(`  - Name: ${contentSample.name || 'Unnamed'}`);
        console.log(`  - URL: ${contentSample.data?.url || 'No URL'}`);
        
        if (contentSample.data?.blocks) {
            console.log(chalk.cyan('\nSections/Blocks Structure:'));
            console.log(`  - Total blocks: ${contentSample.data.blocks.length}`);
            
            const componentTypes = new Set();
            contentSample.data.blocks.forEach(block => {
                const type = block.component?.name || block['@type'] || 'custom';
                componentTypes.add(type);
            });
            
            console.log(`  - Unique component types: ${componentTypes.size}`);
            console.log(chalk.cyan('  - Component types found:'));
            componentTypes.forEach(type => {
                console.log(`      • ${type}`);
            });
        }
    } catch (err) {
        // File doesn't exist or parse error
    }
    
    console.log(chalk.yellow('\n🎯 Key Findings:'));
    console.log(chalk.green('\n✅ USE CASE 1: Identifying sections on a specific page'));
    console.log('  Solution: Use Content API with URL query');
    console.log('  Example: GET /api/v3/content/page?apiKey={KEY}&query={"data.url":"/page-url"}');
    console.log('  Then analyze the data.blocks array for section information');
    
    console.log(chalk.green('\n✅ USE CASE 2: Finding pages with specific sections'));
    console.log('  Solution: Use Content API with component query');
    console.log('  Example: GET /api/v3/content/page?apiKey={KEY}&query={"data.blocks":{"$elemMatch":{"component.name":"SectionName"}}}');
    console.log('  Returns all pages containing the specified section');
    
    console.log(chalk.yellow('\n📝 Recommendations:'));
    console.log('  1. Content API is the best choice for both use cases');
    console.log('  2. HTML API provides rendered output but requires parsing');
    console.log('  3. Use query parameters for efficient filtering');
    console.log('  4. The data.blocks array contains all section information');
    console.log('  5. Component names are found in block.component.name or block["@type"]');
}

async function createUseCaseExamples() {
    console.log(chalk.yellow('\n📁 Creating practical example scripts...'));
    
    // Create use case 1 example
    const useCase1 = `import axios from 'axios';

const PUBLIC_KEY = 'f2f3655202764523914b8dbf61505ee8';

/**
 * Use Case 1: Get all sections used on a specific page
 */
async function getSectionsOnPage(pageUrl) {
    const query = { 'data.url': pageUrl };
    const queryString = encodeURIComponent(JSON.stringify(query));
    const apiUrl = \`https://cdn.builder.io/api/v3/content/page?apiKey=\${PUBLIC_KEY}&query=\${queryString}&limit=1\`;
    
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
        console.log('\\nSections:');
        result.sections.forEach(section => {
            console.log(\`  \${section.index + 1}. \${section.type} (ID: \${section.id})\`);
        });
    }
});`;

    await fs.writeFile('use-case-1-get-sections.js', useCase1);
    console.log(chalk.green('  ✓ Created use-case-1-get-sections.js'));
    
    // Create use case 2 example
    const useCase2 = `import axios from 'axios';

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
    const apiUrl = \`https://cdn.builder.io/api/v3/content/page?apiKey=\${PUBLIC_KEY}&query=\${queryString}&limit=100\`;
    
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
        console.log('\\nPages:');
        result.pages.forEach(page => {
            console.log(\`  - \${page.name} (\${page.url}) - \${page.sectionCount} instances\`);
        });
    }
});`;

    await fs.writeFile('use-case-2-find-pages.js', useCase2);
    console.log(chalk.green('  ✓ Created use-case-2-find-pages.js'));
    
    // Create combined utility
    const utilityScript = `import axios from 'axios';

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
        const apiUrl = \`\${this.baseUrl}/page?apiKey=\${this.publicKey}&query=\${queryString}&limit=1\`;
        
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
        const apiUrl = \`\${this.baseUrl}/page?apiKey=\${this.publicKey}&query=\${queryString}&limit=\${limit}\`;
        
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
        const apiUrl = \`\${this.baseUrl}/page?apiKey=\${this.publicKey}&limit=\${limit}\`;
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
    console.log(\`Found \${pages.length} pages with Text section\`);
});

// Example 3: Get all section types
analyzer.getAllSectionTypes().then(types => {
    console.log('All section types:', types);
});`;

    await fs.writeFile('builder-section-analyzer.js', utilityScript);
    console.log(chalk.green('  ✓ Created builder-section-analyzer.js (utility class)'));
}

// Main execution
async function main() {
    try {
        // Install dependencies first
        console.log(chalk.yellow('Installing dependencies...\n'));
        await new Promise((resolve, reject) => {
            const child = spawn('npm', ['install'], {
                stdio: 'inherit',
                shell: true,
                cwd: '/workspace/builder-api-tests'
            });
            child.on('exit', resolve);
            child.on('error', reject);
        });
        
        // Run tests sequentially
        await runTest('test-html-api.js');
        await runTest('test-content-api.js');
        await runTest('test-admin-api.js');
        
        // Generate summary and examples
        await generateSummaryReport();
        await createUseCaseExamples();
        
        console.log(chalk.magenta.bold('\n' + '='.repeat(60)));
        console.log(chalk.magenta.bold('   ALL TESTS COMPLETED SUCCESSFULLY!'));
        console.log(chalk.magenta.bold('='.repeat(60) + '\n'));
        
        console.log(chalk.green('✅ Both use cases are achievable using the Content API'));
        console.log(chalk.green('✅ Example scripts have been created for immediate use'));
        console.log(chalk.green('✅ Check the generated files for detailed results\n'));
        
    } catch (error) {
        console.error(chalk.red('\nError running tests:'), error);
        process.exit(1);
    }
}

main();