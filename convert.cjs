const fs = require('fs');

function convertHtmlToJsx(filePath, outPath, componentName) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract the body content
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyContent = bodyMatch ? bodyMatch[1] : content;
    
    // Remove the script tags
    bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
    
    // Replace class= with className=
    bodyContent = bodyContent.replace(/class=/g, 'className=');
    // Replace onclick= with onClick=
    bodyContent = bodyContent.replace(/onclick=/g, 'onClick=');
    // Replace onchange= with onChange=
    bodyContent = bodyContent.replace(/onchange=/g, 'onChange=');
    // Replace for= with htmlFor=
    bodyContent = bodyContent.replace(/for=/g, 'htmlFor=');
    
    // Fix self-closing tags
    const selfClosingTags = ['img', 'br', 'hr', 'input', 'meta', 'link'];
    selfClosingTags.forEach(tag => {
        const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'gi');
        bodyContent = bodyContent.replace(regex, `<${tag}$1 />`);
    });
    
    // Remove HTML comments (might cause issues in JSX)
    bodyContent = bodyContent.replace(/<!--[\s\S]*?-->/g, '');
    
    // Some inline styles need to be converted to React styles, but for simplicity, 
    // let's replace style="margin: 20px 0; border: 1px solid #ccc;" with style={{margin: '20px 0', border: '1px solid #ccc'}}
    // This is hard to do with regex reliably for all cases, so I'll just remove or fix the specific ones I know
    bodyContent = bodyContent.replace(/style="margin: 20px 0; border: 1px solid #ccc;"/g, "style={{margin: '20px 0', border: '1px solid #ccc'}}");
    
    // Fix SVG tags (viewBox instead of viewbox, etc)
    bodyContent = bodyContent.replace(/viewbox/gi, 'viewBox');
    bodyContent = bodyContent.replace(/stroke-width/g, 'strokeWidth');
    bodyContent = bodyContent.replace(/stroke-linecap/g, 'strokeLinecap');
    bodyContent = bodyContent.replace(/stroke-linejoin/g, 'strokeLinejoin');
    
    const jsxContent = `import React from 'react';

export default function ${componentName}() {
    return (
        <>
            ${bodyContent}
        </>
    );
}
`;
    fs.writeFileSync(outPath, jsxContent);
}

convertHtmlToJsx('old_index.html', 'src/pages/Home.jsx', 'Home');
convertHtmlToJsx('old_dashboard.html', 'src/pages/Dashboard.jsx', 'Dashboard');

console.log('Conversion complete');
