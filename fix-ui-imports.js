import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using ES module pattern
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the source directory
const srcDir = path.join(__dirname, 'src');

// Function to recursively find all .ts and .tsx files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findFiles(filePath, fileList);
    } else if (
      (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) && 
      !filePath.includes('node_modules')
    ) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  console.log(`Processing ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix @/lib/utils imports
  if (content.includes('from "@/lib/utils"') || content.includes("from '@/lib/utils'")) {
    const relativePath = path.relative(path.dirname(filePath), path.join(srcDir, 'lib'));
    const normalizedPath = relativePath.split(path.sep).join('/');
    
    content = content.replace(/from ['"]@\/lib\/utils['"]/, `from "${normalizedPath}/utils"`);
    modified = true;
  }
  
  // Fix @/components imports
  const componentRegex = /from ['"]@\/components\/([^'"]+)['"]([;\s]*)/g;
  let match;
  while ((match = componentRegex.exec(content)) !== null) {
    const componentPath = match[1];
    const relativePath = path.relative(path.dirname(filePath), path.join(srcDir, 'components'));
    const normalizedPath = relativePath.split(path.sep).join('/');
    
    const newImport = `from "${normalizedPath}/${componentPath}"${match[2]}`;
    content = content.replace(match[0], newImport);
    modified = true;
  }
  
  // Fix @/hooks imports
  if (content.includes('from "@/hooks/') || content.includes("from '@/hooks/")) {
    const hooksRegex = /from ['"]@\/hooks\/([^'"]+)['"]([;\s]*)/g;
    while ((match = hooksRegex.exec(content)) !== null) {
      const hookPath = match[1];
      const relativePath = path.relative(path.dirname(filePath), path.join(srcDir, 'hooks'));
      const normalizedPath = relativePath.split(path.sep).join('/');
      
      const newImport = `from "${normalizedPath}/${hookPath}"${match[2]}`;
      content = content.replace(match[0], newImport);
      modified = true;
    }
  }
  
  // Fix @/store imports
  if (content.includes('from "@/store/') || content.includes("from '@/store/")) {
    const storeRegex = /from ['"]@\/store\/([^'"]+)['"]([;\s]*)/g;
    while ((match = storeRegex.exec(content)) !== null) {
      const storePath = match[1];
      const relativePath = path.relative(path.dirname(filePath), path.join(srcDir, 'store'));
      const normalizedPath = relativePath.split(path.sep).join('/');
      
      const newImport = `from "${normalizedPath}/${storePath}"${match[2]}`;
      content = content.replace(match[0], newImport);
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed imports in ${filePath}`);
    return true;
  }
  
  return false;
}

// Main function
function main() {
  const files = findFiles(srcDir);
  let fixedCount = 0;
  
  files.forEach(file => {
    if (fixImportsInFile(file)) {
      fixedCount++;
    }
  });
  
  console.log(`Fixed imports in ${fixedCount} files`);
}

main();