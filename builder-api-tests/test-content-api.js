import axios from 'axios';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const PUBLIC_KEY = process.env.BUILDER_PUBLIC_KEY;
const PRIVATE_KEY = process.env.BUILDER_PRIVATE_KEY;

console.log(chalk.blue.bold('\n=== Testing Builder.io Content API ===\n'));

/**
 * Test 1: Get all content entries to understand structure
 */
async function testGetAllContent() {
    console.log(chalk.yellow('Test 1: Fetching all content entries'));
    
    try {
        const contentApiUrl = `https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&limit=10`;
        
        console.log(chalk.gray(`Requesting: ${contentApiUrl}`));
        
        const response = await axios.get(contentApiUrl);
        
        if (response.data && response.data.results) {
            console.log(chalk.green(`✓ Retrieved ${response.data.results.length} content entries`));
            
            // Analyze the structure of the first entry
            if (response.data.results.length > 0) {
                const firstEntry = response.data.results[0];
                console.log(chalk.cyan('\nFirst entry structure:'));
                console.log(`  - ID: ${firstEntry.id}`);
                console.log(`  - Name: ${firstEntry.name}`);
                console.log(`  - URL: ${firstEntry.data?.url}`);
                
                // Check for blocks/sections
                if (firstEntry.data?.blocks) {
                    console.log(chalk.cyan(`\n  Blocks/Sections found: ${firstEntry.data.blocks.length}`));
                    
                    // Analyze block types
                    const blockTypes = new Map();
                    firstEntry.data.blocks.forEach(block => {
                        const componentName = block.component?.name || block['@type'] || 'unknown';
                        blockTypes.set(componentName, (blockTypes.get(componentName) || 0) + 1);
                    });
                    
                    console.log(chalk.cyan('\n  Block/Component types:'));
                    blockTypes.forEach((count, type) => {
                        console.log(`    - ${type}: ${count} instances`);
                    });
                    
                    // Save sample for analysis
                    const fs = await import('fs');
                    await fs.promises.writeFile(
                        'content-api-sample.json', 
                        JSON.stringify(firstEntry, null, 2)
                    );
                    console.log(chalk.gray('\n  Sample saved to content-api-sample.json'));
                }
            }
            
            // List all page names and URLs
            console.log(chalk.cyan('\nAll retrieved pages:'));
            response.data.results.forEach((page, index) => {
                console.log(`  ${index + 1}. ${page.name || 'Unnamed'} - ${page.data?.url || 'No URL'}`);
            });
            
        } else {
            console.log(chalk.red('✗ No content entries found'));
        }
        
    } catch (error) {
        console.log(chalk.red(`✗ Error: ${error.message}`));
        if (error.response) {
            console.log(chalk.red(`  Status: ${error.response.status}`));
        }
    }
}

/**
 * Test 2: Query for pages containing specific sections
 */
async function testQuerySpecificSections() {
    console.log(chalk.yellow('\nTest 2: Querying for pages with specific sections'));
    
    // First, let's get a sample to know what sections exist
    try {
        // Get sample content first
        const sampleUrl = `https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&limit=5`;
        const sampleResponse = await axios.get(sampleUrl);
        
        if (sampleResponse.data?.results?.length > 0) {
            // Extract unique component names from all pages
            const componentNames = new Set();
            sampleResponse.data.results.forEach(page => {
                if (page.data?.blocks) {
                    page.data.blocks.forEach(block => {
                        const name = block.component?.name || block['@type'];
                        if (name) componentNames.add(name);
                    });
                }
            });
            
            console.log(chalk.cyan('Found component types to search for:'));
            Array.from(componentNames).forEach(name => console.log(`  - ${name}`));
            
            // Now test querying for each component type
            for (const componentName of Array.from(componentNames).slice(0, 3)) { // Test first 3
                console.log(chalk.gray(`\nSearching for pages containing: ${componentName}`));
                
                try {
                    // Try different query formats
                    const queries = [
                        // Query format 1: Using dot notation
                        {
                            'data.blocks.component.name': componentName
                        },
                        // Query format 2: Using $elemMatch
                        {
                            'data.blocks': {
                                '$elemMatch': {
                                    'component.name': componentName
                                }
                            }
                        }
                    ];
                    
                    for (let i = 0; i < queries.length; i++) {
                        const queryString = encodeURIComponent(JSON.stringify(queries[i]));
                        const queryUrl = `https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&query=${queryString}&limit=5`;
                        
                        console.log(chalk.gray(`  Query format ${i + 1}...`));
                        
                        try {
                            const response = await axios.get(queryUrl);
                            if (response.data?.results) {
                                console.log(chalk.green(`    ✓ Found ${response.data.results.length} pages`));
                                response.data.results.forEach(page => {
                                    console.log(`      - ${page.name || 'Unnamed'}: ${page.data?.url || 'No URL'}`);
                                });
                            }
                        } catch (queryError) {
                            console.log(chalk.red(`    ✗ Query failed: ${queryError.message}`));
                        }
                    }
                } catch (error) {
                    console.log(chalk.red(`  Error querying for ${componentName}: ${error.message}`));
                }
            }
        }
    } catch (error) {
        console.log(chalk.red(`✗ Error in section query test: ${error.message}`));
    }
}

/**
 * Test 3: Get specific page by URL and analyze sections
 */
async function testGetPageByUrl() {
    console.log(chalk.yellow('\nTest 3: Getting specific page by URL and analyzing sections'));
    
    const testUrls = ['/', '/home', '/about'];
    
    for (const url of testUrls) {
        try {
            const query = { 'data.url': url };
            const queryString = encodeURIComponent(JSON.stringify(query));
            const apiUrl = `https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&query=${queryString}&limit=1`;
            
            console.log(chalk.gray(`\nFetching page with URL: ${url}`));
            
            const response = await axios.get(apiUrl);
            
            if (response.data?.results?.length > 0) {
                const page = response.data.results[0];
                console.log(chalk.green(`✓ Found page: ${page.name}`));
                
                if (page.data?.blocks) {
                    console.log(chalk.cyan(`  Sections/Blocks on this page: ${page.data.blocks.length}`));
                    
                    // List all sections with their properties
                    page.data.blocks.forEach((block, index) => {
                        const componentName = block.component?.name || block['@type'] || 'Custom Block';
                        console.log(`    ${index + 1}. ${componentName}`);
                        
                        // Show some properties if available
                        if (block.component?.options) {
                            const optionKeys = Object.keys(block.component.options).slice(0, 3);
                            if (optionKeys.length > 0) {
                                console.log(`       Properties: ${optionKeys.join(', ')}`);
                            }
                        }
                    });
                }
            } else {
                console.log(chalk.yellow(`  No page found for URL: ${url}`));
            }
        } catch (error) {
            console.log(chalk.red(`  Error fetching ${url}: ${error.message}`));
        }
    }
}

/**
 * Test 4: Advanced querying with regex and operators
 */
async function testAdvancedQuerying() {
    console.log(chalk.yellow('\nTest 4: Testing advanced querying capabilities'));
    
    try {
        // Test regex search for component names
        const regexQuery = {
            'data.blocks.component.name': {
                '$regex': '.*',  // Match any component
                '$options': 'i'  // Case insensitive
            }
        };
        
        const queryString = encodeURIComponent(JSON.stringify(regexQuery));
        const apiUrl = `https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&query=${queryString}&limit=5`;
        
        console.log(chalk.gray('Testing regex query for any component...'));
        
        const response = await axios.get(apiUrl);
        
        if (response.data?.results) {
            console.log(chalk.green(`✓ Regex query returned ${response.data.results.length} results`));
        }
        
        // Test with fields parameter to get only specific fields
        console.log(chalk.gray('\nTesting field selection...'));
        const fieldsUrl = `https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&fields=id,name,data.url,data.blocks&limit=3`;
        
        const fieldsResponse = await axios.get(fieldsUrl);
        if (fieldsResponse.data?.results) {
            console.log(chalk.green(`✓ Field selection successful`));
            
            // Save a sample with selected fields
            const fs = await import('fs');
            await fs.promises.writeFile(
                'content-api-fields-sample.json',
                JSON.stringify(fieldsResponse.data.results[0], null, 2)
            );
            console.log(chalk.gray('  Sample with selected fields saved to content-api-fields-sample.json'));
        }
        
    } catch (error) {
        console.log(chalk.red(`✗ Advanced querying error: ${error.message}`));
    }
}

/**
 * Test 5: Using Private Key for write operations
 */
async function testWithPrivateKey() {
    console.log(chalk.yellow('\nTest 5: Testing with private key for additional capabilities'));
    
    try {
        // Try to get content with private key (might have additional data)
        const apiUrl = `https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&limit=1`;
        
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${PRIVATE_KEY}`
            }
        });
        
        if (response.data?.results) {
            console.log(chalk.green('✓ Successfully accessed with private key'));
            console.log(chalk.cyan(`  Retrieved ${response.data.results.length} entries`));
        }
        
    } catch (error) {
        console.log(chalk.red(`✗ Private key test error: ${error.message}`));
    }
}

// Run all tests
async function runAllTests() {
    await testGetAllContent();
    await testQuerySpecificSections();
    await testGetPageByUrl();
    await testAdvancedQuerying();
    await testWithPrivateKey();
    
    console.log(chalk.blue.bold('\n=== Content API Testing Complete ===\n'));
}

runAllTests().catch(console.error);