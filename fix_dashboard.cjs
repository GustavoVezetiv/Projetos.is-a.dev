const fs = require('fs');

let content = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');

// Helper to extract a template's inner HTML
function extractTemplate(id) {
    const startStr = `<div id="template-${id}"`;
    const startIdx = content.indexOf(startStr);
    if (startIdx === -1) return '';
    
    // Find the end of the opening div tag
    let innerStartIdx = content.indexOf('>', startIdx) + 1;
    
    // Count divs to find the matching closing div
    let depth = 1;
    let currIdx = innerStartIdx;
    
    while (depth > 0 && currIdx < content.length) {
        let nextOpen = content.indexOf('<div', currIdx);
        let nextClose = content.indexOf('</div', currIdx);
        
        if (nextOpen === -1) nextOpen = Infinity;
        if (nextClose === -1) break;
        
        if (nextOpen < nextClose) {
            depth++;
            currIdx = nextOpen + 4;
        } else {
            depth--;
            currIdx = nextClose + 5;
        }
    }
    
    const innerHTML = content.substring(innerStartIdx, currIdx - 6);
    
    // Remove the template from original content
    content = content.substring(0, startIdx) + content.substring(currIdx + 1);
    
    return innerHTML;
}

const certsContent = extractTemplate('certificados');
const projetosContent = extractTemplate('projetos');
const sobreContent = extractTemplate('sobre');
const dossieContent = extractTemplate('dossie');
const curriculoContent = extractTemplate('curriculo');

// Now, let's fix all onClick in the extracted contents and the main content
function fixOnClicks(str) {
    if(!str) return '';
    str = str.replace(/onClick="goBackToIndex\(\)"/g, 'onClick={goBackToIndex}');
    str = str.replace(/onClick="confirmRedirect\('([^']+)'\)"/g, 'onClick={() => confirmRedirect(\'$1\')}');
    str = str.replace(/onClick="handleBackdropClick\(event\)"/g, 'onClick={closeApp}');
    str = str.replace(/onClick="event\.stopPropagation\(\)"/g, 'onClick={(e) => e.stopPropagation()}');
    str = str.replace(/onClick="goBack\(\)"/g, 'onClick={closeApp}');
    str = str.replace(/onClick="closeApp\(\)"/g, 'onClick={closeApp}');
    str = str.replace(/onClick="loadApp\('([^']+)'\)"/g, 'onClick={() => loadApp(\'$1\')}');
    str = str.replace(/onClick="openV3App\('([^']+)'\)"/g, 'onClick={() => loadApp(\'$1\')}');
    str = str.replace(/onClick="openCertModal\('([^']+)'\)"/g, 'onClick={() => openCertModal(\'$1\')}');
    str = str.replace(/onClick="closeCertModal\(\)"/g, 'onClick={closeCertModal}');
    str = str.replace(/onClick="closeCertModal\(event\)"/g, 'onClick={closeCertModal}');
    str = str.replace(/onClick="toggleBioExpand\(\)"/g, 'onClick={() => setBioExpanded(!bioExpanded)}');
    // Also fix class to className if any was missed (though it seems mostly className already)
    return str;
}

content = fixOnClicks(content);

// Add the components at the top, and modify Dashboard
const topCode = `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CertificadosTemplate({ openCertModal }) {
    return (
        <React.Fragment>
            ${fixOnClicks(certsContent)}
        </React.Fragment>
    );
}

function ProjetosTemplate() {
    return (
        <React.Fragment>
            ${fixOnClicks(projetosContent)}
        </React.Fragment>
    );
}

function SobreTemplate({ bioExpanded, setBioExpanded }) {
    return (
        <React.Fragment>
            ${fixOnClicks(sobreContent).replace(/id="bio-expanded-content" className="hidden/g, 'id="bio-expanded-content" className={!bioExpanded ? "hidden" : ""').replace(/className="hidden text-white/g, 'className={(!bioExpanded ? "hidden " : "") + "text-white')}
        </React.Fragment>
    );
}

function DossieTemplate() {
    return (
        <React.Fragment>
            ${fixOnClicks(dossieContent)}
        </React.Fragment>
    );
}

function CurriculoTemplate() {
    return (
        <React.Fragment>
            ${fixOnClicks(curriculoContent)}
        </React.Fragment>
    );
}
`;

content = content.replace("import React from 'react';", topCode);

// Add states and functions inside Dashboard()
const dashboardStartCode = `export default function Dashboard() {
    const navigate = useNavigate();
    const [activeApp, setActiveApp] = useState(null);
    const [activeCert, setActiveCert] = useState(null);
    const [bioExpanded, setBioExpanded] = useState(false);

    const loadApp = (app) => setActiveApp(app);
    const closeApp = () => setActiveApp(null);
    const openCertModal = (cert) => setActiveCert(cert);
    const closeCertModal = () => setActiveCert(null);
    
    const confirmRedirect = (url) => {
        window.open(url, '_blank');
    };
    
    const goBackToIndex = () => {
        navigate('/');
    };
`;
content = content.replace("export default function Dashboard() {", dashboardStartCode);

// Fix v3-app-window hidden class
content = content.replace(/<div id="v3-app-window" className="hidden /g, '<div id="v3-app-window" className={`${activeApp ? "" : "hidden"} ');
content = content.replace(/app-window pointer-events-none" onClick=\{closeApp\}>/g, 'app-window pointer-events-none`} onClick={closeApp}>');

// Fix cert-modal hidden class
content = content.replace(/<div id="cert-modal" className="hidden /g, '<div id="cert-modal" className={`${activeCert ? "" : "hidden"} ');
content = content.replace(/pointer-events-none" onClick=\{closeCertModal\}>/g, 'pointer-events-none`} onClick={closeCertModal}>');

// Insert activeCert title into cert-modal-content
// In the original, cert-modal-content is empty. We can just put an image or text there.
// Let's just put the cert name for now so it's not empty.
content = content.replace(/<div id="cert-modal-content" className="space-y-4">\s*<\/div>/, `<div id="cert-modal-content" className="space-y-4">
    <h3 className="text-white text-xl font-bold">{activeCert}</h3>
    <p className="text-white/60">Certificado indisponível no momento.</p>
</div>`);

// Inject templates into v3-app-body
const bodyRegex = /<div id="v3-app-body" className="([^"]+)">\s*<\/div>/;
content = content.replace(bodyRegex, `<div id="v3-app-body" className="$1">
    {activeApp === 'certificados' && <CertificadosTemplate openCertModal={openCertModal} />}
    {activeApp === 'projetos' && <ProjetosTemplate />}
    {activeApp === 'sobre' && <SobreTemplate bioExpanded={bioExpanded} setBioExpanded={setBioExpanded} />}
    {activeApp === 'dossie' && <DossieTemplate />}
    {activeApp === 'curriculo' && <CurriculoTemplate />}
</div>`);

// Fix "GUSTAVO" vertical centering
// Replace `className="flex-1 flex flex-col justify-center items-center mb-24 animate-fadeIn transition-all duration-500 relative w-full"`
// with full height viewport
content = content.replace(/className="flex-1 flex flex-col justify-center items-center mb-24/g, 'className="h-screen flex flex-col justify-center items-center pb-24');
content = content.replace(/<section className="page-section h-full/g, '<section className="page-section min-h-screen h-full');

// One more fix: "class" inside templates instead of "className"
content = content.replace(/ class="/g, ' className="');

fs.writeFileSync('src/pages/Dashboard.jsx', content);
