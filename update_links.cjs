const fs = require('fs');

let content = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');

content = content.replace(
    "'https://linkedin.com/in/gustavovezetiv'",
    "'https://www.linkedin.com/in/gustavo-vezetiv-08416126b/'"
);

content = content.replace(
    "'https://instagram.com/gustavovezetiv'",
    "'https://www.instagram.com/vezetiv.dev'"
);

// The github link should already be 'https://github.com/gustavovezetiv'
// Let's just make sure
if (!content.includes("'https://github.com/gustavovezetiv'")) {
    console.log("GitHub link might be missing or incorrect");
}

fs.writeFileSync('src/pages/Dashboard.jsx', content);
console.log("Success");
