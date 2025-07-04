import nextra from 'nextra'
import path from 'path'

const __dirname = import.meta.dirname;
 
// Set up Nextra with its configuration
const withNextra = nextra({
    latex: true,
    contentDirBasePath: '/'
})
 
// Export the final Next.js config with Nextra included

var outputConfig = withNextra({
    root: '.',
    output: 'export', // Enable static export for GitHub Pages
    // webpack: {
    //     resolve: {
    //         alias: {
    //             'private-next-root-dir': __dirname
    //         }
    //     }
    // },
   turbo: {
   resolveAlias: {
    'private-next-root-dir': __dirname + '/',
     // Path to your `mdx-components` file with extension
     'next-mdx-import-source-file': 'src/mdx-components.js'
   }
 }
})

console.log('turbopack config', outputConfig.turbopack);

export default outputConfig;