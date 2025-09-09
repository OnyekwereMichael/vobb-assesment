import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fixImportsInDirectory(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      fixImportsInDirectory(fullPath);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      fixImportsInFile(fullPath);
    }
  }
}

function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace @/lib/utils with relative path
    if (content.includes('@/lib/utils')) {
      const relativePath = path.relative(path.dirname(filePath), path.join(__dirname, 'src', 'lib')).replace(/\\/g, '/');
      const newContent = content.replace(/from\s+['"]@\/lib\/utils['"]/, `from "${relativePath}/utils"`);
      
      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Fixed imports in ${filePath}`);
      }
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

// Start fixing imports from the src directory
fixImportsInDirectory(path.join(__dirname, 'src'));

console.log('Import paths fixed successfully!');