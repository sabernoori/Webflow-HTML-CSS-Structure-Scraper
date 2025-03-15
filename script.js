<script>
// Function to get DOM structure with key styles
function getDOMStructure(element = document.body, level = 0) {
    let structure = '';
    const indent = '  '.repeat(level);
    
    // Get element details
    const classes = Array.from(element.classList).join('.');
    const id = element.id ? `#${element.id}` : '';
    const tag = element.tagName.toLowerCase();
    
    // Build element string
    structure += `${indent}${tag}${id}${classes ? `.${classes}` : ''}\n`;
    
    // Get computed styles
    const styles = window.getComputedStyle(element);
    const display = styles.getPropertyValue('display');
    const position = styles.getPropertyValue('position');
    const width = styles.getPropertyValue('width');
    const height = styles.getPropertyValue('height');
    
    // Add styles indented
    const styleIndent = indent + '  ';
    structure += `${styleIndent}display: ${display};\n`;
    structure += `${styleIndent}position: ${position};\n`;
    structure += `${styleIndent}width: ${width};\n`;
    structure += `${styleIndent}height: ${height};\n`;
    
    // Process children
    Array.from(element.children).forEach(child => {
        structure += getDOMStructure(child, level + 1);
    });
    
    return structure;
}

// Output structure when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const structure = getDOMStructure();
    console.log('DOM Structure with Styles:');
    console.log(structure);
    
    // Create a pre element to display the structure on the page
    const pre = document.createElement('pre');
    pre.style.cssText = 'position: fixed; top: 10px; right: 10px; background: white; padding: 20px; border: 1px solid #ccc; max-height: 80vh; overflow: auto; z-index: 9999;';
    pre.textContent = structure;
    document.body.appendChild(pre);
});
</script>
