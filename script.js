<script>
// Function to get DOM structure with CSS and media queries
function getDOMStructureWithCSS(element = document.body, level = 0) {
    let structure = '';
    const indent = '  '.repeat(level);
    const classes = Array.from(element.classList).join('.');
    const id = element.id ? `#${element.id}` : '';
    const tag = element.tagName.toLowerCase();
    
    // Get computed styles
    const styles = window.getComputedStyle(element);
    const relevantStyles = [
        'display', 'position', 'width', 'height', 'margin', 'padding',
        'background', 'color', 'font-size', 'flex', 'grid',
        'border', 'border-radius', 'box-shadow', 'transform'
    ];
    
    const styleString = relevantStyles
        .filter(prop => styles.getPropertyValue(prop))
        .map(prop => `${prop}: ${styles.getPropertyValue(prop)};`)
        .join(' ');

    // Get responsive styles
    const breakpoints = [
        { width: 991, name: 'Tablet' },
        { width: 767, name: 'Mobile Landscape' },
        { width: 479, name: 'Mobile Portrait' }
    ];

    // Build element string
    structure += `${indent}${tag}${id}${classes ? `.${classes}` : ''} {\n`;
    structure += `${indent}  /* Desktop styles */\n`;
    structure += `${indent}  ${styleString}\n`;
    
    // Add media queries
    breakpoints.forEach(bp => {
        structure += `${indent}  /* ${bp.name} styles */\n`;
        structure += `${indent}  @media (max-width: ${bp.width}px) {\n`;
        structure += `${indent}    /* Add breakpoint-specific styles here */\n`;
        structure += `${indent}  }\n`;
    });
    
    structure += `${indent}}\n\n`;

    // Process children
    Array.from(element.children).forEach(child => {
        structure += getDOMStructureWithCSS(child, level + 1);
    });

    return structure;
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        const button = document.getElementById('copyButton');
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = 'Copy to Clipboard';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
    document.body.removeChild(textarea);
}

// Output structure when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const structure = getDOMStructureWithCSS();
    console.log('DOM Structure with CSS:');
    console.log(structure);

    // Create container for the window
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50vw;
        height: 80vh;
        background: white;
        padding: 20px;
        border: 1px solid #ccc;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        z-index: 999999999;
        display: flex;
        flex-direction: column;
    `;

    // Create and style the copy button
    const copyButton = document.createElement('button');
    copyButton.id = 'copyButton';
    copyButton.textContent = 'Copy to Clipboard';
    copyButton.style.cssText = `
        margin-bottom: 10px;
        padding: 8px 16px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        z-index: 999999999;
    `;
    copyButton.onclick = () => copyToClipboard(structure);

    // Create and style the pre element
    const pre = document.createElement('pre');
    pre.id = 'structureWindow';
    pre.style.cssText = `
        flex: 1;
        overflow: auto;
        margin: 0;
        padding: 10px;
        background: white;
        color: black;
        font-family: monospace;
        white-space: pre-wrap;
        word-wrap: break-word;
    `;
    pre.textContent = structure;

    // Append elements
    container.appendChild(copyButton);
    container.appendChild(pre);
    document.body.appendChild(container);
});
</script>
