import axios from 'axios';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const PUBLIC_KEY = process.env.BUILDER_PUBLIC_KEY;
const PRIVATE_KEY = process.env.BUILDER_PRIVATE_KEY;

console.log(chalk.blue.bold('\n=== Testing Builder.io Admin API ===\n'));

/**
 * Test 1: Get models to understand data structure
 */
async function testGetModels() {
    console.log(chalk.yellow('Test 1: Fetching available models'));
    
    try {
        // Admin API typically requires private key authentication
        const apiUrl = `https://builder.io/api/v2/models`;
        
        console.log(chalk.gray(`Requesting: ${apiUrl}`));
        
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${PRIVATE_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.data) {
            console.log(chalk.green(`✓ Retrieved models successfully`));
            
            if (Array.isArray(response.data)) {
                console.log(chalk.cyan(`\nFound ${response.data.length} models:`));
                response.data.forEach(model => {
                    console.log(`  - ${model.name} (${model.kind || 'unknown kind'})`);
                    if (model.fields) {
                        console.log(`    Fields: ${model.fields.length}`);
                    }
                });
                
                // Save models for analysis
                const fs = await import('fs');
                await fs.promises.writeFile(
                    'admin-api-models.json',
                    JSON.stringify(response.data, null, 2)
                );
                console.log(chalk.gray('\nModels saved to admin-api-models.json'));
            }
        }
        
    } catch (error) {
        console.log(chalk.red(`✗ Error: ${error.message}`));
        if (error.response) {
            console.log(chalk.red(`  Status: ${error.response.status}`));
            if (error.response.status === 401) {
                console.log(chalk.yellow('  Note: Admin API requires proper authentication'));
            }
        }
    }
}

/**
 * Test 2: Get content with admin privileges
 */
async function testAdminContent() {
    console.log(chalk.yellow('\nTest 2: Fetching content with admin privileges'));
    
    try {
        const apiUrl = `https://builder.io/api/v1/content/page?apiKey=${PUBLIC_KEY}`;
        
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${PRIVATE_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.data?.results) {
            console.log(chalk.green(`✓ Retrieved ${response.data.results.length} content entries with admin access`));
            
            // Check if we get additional fields with admin access
            if (response.data.results.length > 0) {
                const entry = response.data.results[0];
                console.log(chalk.cyan('\nAdmin content fields:'));
                console.log(`  - ID: ${entry.id}`);
                console.log(`  - Created: ${entry.createdDate}`);
                console.log(`  - Updated: ${entry.lastUpdated}`);
                console.log(`  - Published: ${entry.published}`);
                console.log(`  - CreatedBy: ${entry.createdBy}`);
                
                // Check for meta information
                if (entry.meta) {
                    console.log(chalk.cyan('\n  Meta information available:'));
                    Object.keys(entry.meta).forEach(key => {
                        console.log(`    - ${key}`);
                    });
                }
            }
        }
        
    } catch (error) {
        console.log(chalk.red(`✗ Error: ${error.message}`));
    }
}

/**
 * Test 3: Get symbols/components definitions
 */
async function testGetSymbols() {
    console.log(chalk.yellow('\nTest 3: Fetching symbols/components'));
    
    try {
        // Try different endpoints for symbols
        const endpoints = [
            `https://cdn.builder.io/api/v3/content/symbol?apiKey=${PUBLIC_KEY}`,
            `https://builder.io/api/v1/symbols?apiKey=${PUBLIC_KEY}`,
            `https://cdn.builder.io/api/v2/content/symbol?apiKey=${PUBLIC_KEY}`
        ];
        
        for (const endpoint of endpoints) {
            console.log(chalk.gray(`\nTrying: ${endpoint}`));
            
            try {
                const response = await axios.get(endpoint, {
                    headers: {
                        'Authorization': `Bearer ${PRIVATE_KEY}`
                    },
                    timeout: 5000
                });
                
                if (response.data) {
                    console.log(chalk.green('  ✓ Success'));
                    
                    if (response.data.results && Array.isArray(response.data.results)) {
                        console.log(chalk.cyan(`    Found ${response.data.results.length} symbols`));
                        
                        response.data.results.slice(0, 3).forEach(symbol => {
                            console.log(`      - ${symbol.name || symbol.id}`);
                        });
                        
                        if (response.data.results.length > 0) {
                            const fs = await import('fs');
                            await fs.promises.writeFile(
                                'admin-api-symbols.json',
                                JSON.stringify(response.data.results[0], null, 2)
                            );
                            console.log(chalk.gray('    Sample symbol saved to admin-api-symbols.json'));
                        }
                    }
                }
            } catch (err) {
                console.log(chalk.red(`  ✗ Failed: ${err.message}`));
            }
        }
        
    } catch (error) {
        console.log(chalk.red(`✗ Error in symbols test: ${error.message}`));
    }
}

/**
 * Test 4: Get custom components
 */
async function testGetCustomComponents() {
    console.log(chalk.yellow('\nTest 4: Fetching custom components'));
    
    try {
        const apiUrl = `https://cdn.builder.io/api/v3/content/component?apiKey=${PUBLIC_KEY}`;
        
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${PRIVATE_KEY}`
            }
        });
        
        if (response.data?.results) {
            console.log(chalk.green(`✓ Retrieved ${response.data.results.length} custom components`));
            
            response.data.results.forEach(component => {
                console.log(`  - ${component.name || component.id}`);
                if (component.data?.blocks) {
                    console.log(`    Blocks: ${component.data.blocks.length}`);
                }
            });
        } else {
            console.log(chalk.yellow('No custom components found'));
        }
        
    } catch (error) {
        console.log(chalk.red(`✗ Error: ${error.message}`));
    }
}

/**
 * Test 5: Query content with advanced filters using Admin API
 */
async function testAdvancedAdminQueries() {
    console.log(chalk.yellow('\nTest 5: Testing advanced admin queries'));
    
    try {
        // Query with multiple conditions
        const query = {
            'published': 'published',
            'data.blocks': { '$exists': true }
        };
        
        const queryString = encodeURIComponent(JSON.stringify(query));
        const apiUrl = `https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&query=${queryString}&limit=5`;
        
        console.log(chalk.gray('Querying for published pages with blocks...'));
        
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${PRIVATE_KEY}`
            }
        });
        
        if (response.data?.results) {
            console.log(chalk.green(`✓ Found ${response.data.results.length} matching pages`));
            
            // Analyze block patterns across pages
            const blockPatterns = new Map();
            response.data.results.forEach(page => {
                if (page.data?.blocks) {
                    const pattern = page.data.blocks.map(b => 
                        b.component?.name || b['@type'] || 'custom'
                    ).join(' -> ');
                    
                    blockPatterns.set(pattern, (blockPatterns.get(pattern) || 0) + 1);
                }
            });
            
            if (blockPatterns.size > 0) {
                console.log(chalk.cyan('\nCommon block patterns:'));
                blockPatterns.forEach((count, pattern) => {
                    console.log(`  ${count}x: ${pattern.substring(0, 80)}${pattern.length > 80 ? '...' : ''}`);
                });
            }
        }
        
    } catch (error) {
        console.log(chalk.red(`✗ Advanced query error: ${error.message}`));
    }
}

// Run all tests
async function runAllTests() {
    await testGetModels();
    await testAdminContent();
    await testGetSymbols();
    await testGetCustomComponents();
    await testAdvancedAdminQueries();
    
    console.log(chalk.blue.bold('\n=== Admin API Testing Complete ===\n'));
}

runAllTests().catch(console.error);