const fs = require('fs');
const path = require('path');

// Simple SVG placeholder generator
function createPlaceholderSVG(width = 400, height = 300, text = 'Product Image') {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#f0f0f0"/>
  <rect x="10" y="10" width="${width - 20}" height="${height - 20}" fill="none" stroke="#ddd" stroke-width="2" stroke-dasharray="5,5"/>
  <text x="${width/2}" y="${height/2 - 10}" font-family="Arial, sans-serif" font-size="18" fill="#666" text-anchor="middle">${text}</text>
  <text x="${width/2}" y="${height/2 + 15}" font-family="Arial, sans-serif" font-size="14" fill="#999" text-anchor="middle">${width}x${height}</text>
</svg>`;
}

function createProductPlaceholders() {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  
  // Ensure uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Create various placeholder images
  const placeholders = [
    { name: 'leather-jacket.svg', text: 'Leather Jacket' },
    { name: 'macbook.svg', text: 'MacBook Pro' },
    { name: 'coffee-table.svg', text: 'Coffee Table' },
    { name: 'books.svg', text: 'Book Set' },
    { name: 'tennis-racket.svg', text: 'Tennis Racket' },
    { name: 'lego-set.svg', text: 'LEGO Set' },
    { name: 'car-mats.svg', text: 'Car Mats' },
    { name: 'face-cream.svg', text: 'Face Cream' },
    { name: 'vintage-camera.svg', text: 'Vintage Camera' },
    { name: 'garden-tools.svg', text: 'Garden Tools' },
    { name: 'placeholder.svg', text: 'EcoFinds Product' }
  ];

  placeholders.forEach(placeholder => {
    const svgContent = createPlaceholderSVG(400, 300, placeholder.text);
    const filePath = path.join(uploadsDir, placeholder.name);
    
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, svgContent);
      console.log(`Created placeholder: ${placeholder.name}`);
    }
  });

  console.log('All placeholder images created successfully!');
}

module.exports = createProductPlaceholders;
