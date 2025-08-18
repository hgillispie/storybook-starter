import axios from 'axios';
import * as cheerio from 'cheerio';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const PUBLIC_KEY = process.env.BUILDER_PUBLIC_KEY;
const PRIVATE_KEY = process.env.BUILDER_PRIVATE_KEY;

console.log(chalk.blue.bold('\n=== Testing Builder.io HTML API ===\n'));

/**
 * Test 1: Fetch HTML content and analyze sections
 */
async function testHTMLApiSectionDetection() {
    console.log(chalk.yellow('Test 1: Fetching HTML content and detecting sections'));
    
    try {
        // First, let's try to get some sample content to understand the structure
        const htmlApiUrl = `https://cdn.builder.io/api/v1/html/page?apiKey=${PUBLIC_KEY}&url=/`;
        
        console.log(chalk.gray(`Requesting: ${htmlApiUrl}`));
        
        const response = await axios.get(htmlApiUrl, {
            headers: {
                'Accept': 'text/html',
            }
        });
        
        if (response.data) {
            console.log(chalk.green('✓ HTML content retrieved successfully'));
            
            // Parse HTML with cheerio
            const $ = cheerio.load(response.data);
            
            // Look for Builder.io specific attributes and sections
            const builderBlocks = $('[builder-block]');
            const builderComponents = $('[builder-component]');
            const dataBuilderBlocks = $('[data-builder-block-id]');
            const dataBuilderComponents = $('[data-builder-component]');
            
            console.log(chalk.cyan('\nSection Detection Results:'));
            console.log(`  - Elements with [builder-block]: ${builderBlocks.length}`);
            console.log(`  - Elements with [builder-component]: ${builderComponents.length}`);
            console.log(`  - Elements with [data-builder-block-id]: ${dataBuilderBlocks.length}`);
            console.log(`  - Elements with [data-builder-component]: ${dataBuilderComponents.length}`);
            
            // Extract section/component names
            const componentNames = new Set();
            
            $('[builder-component]').each((i, elem) => {
                const componentName = $(elem).attr('builder-component');
                if (componentName) componentNames.add(componentName);
            });
            
            $('[data-builder-component]').each((i, elem) => {
                const componentName = $(elem).attr('data-builder-component');
                if (componentName) componentNames.add(componentName);
            });
            
            if (componentNames.size > 0) {
                console.log(chalk.cyan('\nDetected Component Names:'));
                componentNames.forEach(name => {
                    console.log(`  - ${name}`);
                });
            }
            
            // Look for custom sections with class names
            const sections = $('section, [class*="section"], [id*="section"]');
            console.log(chalk.cyan(`\nGeneric sections found: ${sections.length}`));
            
            // Save a sample of the HTML for analysis
            const fs = await import('fs');
            await fs.promises.writeFile('html-api-sample.html', response.data);
            console.log(chalk.gray('\nHTML sample saved to html-api-sample.html for analysis'));
            
        } else {
            console.log(chalk.red('✗ No HTML content received'));
        }
        
    } catch (error) {
        console.log(chalk.red(`✗ Error: ${error.message}`));
        if (error.response) {
            console.log(chalk.red(`  Status: ${error.response.status}`));
            console.log(chalk.red(`  Data: ${JSON.stringify(error.response.data, null, 2)}`));
        }
    }
}

/**
 * Test 2: Try different URL patterns
 */
async function testDifferentUrlPatterns() {
    console.log(chalk.yellow('\nTest 2: Testing different URL patterns'));
    
    const testUrls = [
        '/',
        '/home',
        '/about',
        '', // empty URL
    ];
    
    for (const url of testUrls) {
        try {
            const htmlApiUrl = `https://cdn.builder.io/api/v1/html/page?apiKey=${PUBLIC_KEY}${url ? `&url=${url}` : ''}`;
            
            console.log(chalk.gray(`\nTrying URL: ${url || '(empty)'}`));
            
            const response = await axios.get(htmlApiUrl, {
                headers: {
                    'Accept': 'text/html',
                },
                timeout: 5000
            });
            
            if (response.data) {
                const $ = cheerio.load(response.data);
                const hasContent = response.data.length > 100;
                const builderElements = $('[builder-block], [builder-component], [data-builder-block-id], [data-builder-component]').length;
                
                console.log(chalk.green(`  ✓ Success - Content length: ${response.data.length} bytes`));
                console.log(chalk.cyan(`    Builder elements found: ${builderElements}`));
            }
        } catch (error) {
            console.log(chalk.red(`  ✗ Failed: ${error.message}`));
        }
    }
}

/**
 * Test 3: Try with model parameter
 */
async function testWithModelParameter() {
    console.log(chalk.yellow('\nTest 3: Testing with different model parameters'));
    
    const models = ['page', 'section', 'component', 'symbol'];
    
    for (const model of models) {
        try {
            const htmlApiUrl = `https://cdn.builder.io/api/v1/html/${model}?apiKey=${PUBLIC_KEY}`;
            
            console.log(chalk.gray(`\nTrying model: ${model}`));
            
            const response = await axios.get(htmlApiUrl, {
                headers: {
                    'Accept': 'text/html',
                },
                timeout: 5000
            });
            
            if (response.data) {
                console.log(chalk.green(`  ✓ Success - Content length: ${response.data.length} bytes`));
            }
        } catch (error) {
            console.log(chalk.red(`  ✗ Failed: ${error.message}`));
        }
    }
}

// Run all tests
async function runAllTests() {
    await testHTMLApiSectionDetection();
    await testDifferentUrlPatterns();
    await testWithModelParameter();
    
    console.log(chalk.blue.bold('\n=== HTML API Testing Complete ===\n'));
}

runAllTests().catch(console.error);