# File Organizer

This command-line tool built with Node.js helps you declutter your directories by automatically sorting files based on their file types.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Command Details](#command-details)
- [Code Structure](#code-structure)
- [Comments and Functionality](#comments-and-functionality)

## Commands Overview

The File Organizer provides three primary commands:

1. **`tree`**: Visualize directory structure
2. **`organize`**: Automatically sort files into categorized folders
3. **`help`**: Display command usage instructions

## Command Details

### 1. Tree Command (`node main.js tree <directoryPath>`)

**Functionality:**
- Displays a hierarchical tree-like representation of the directory
- Shows files and subdirectories in a nested format
- Uses indentation to represent directory levels

**Example:**
```
└──Downloads
    ├──Documents
        ├──report.pdf
        ├──spreadsheet.xlsx
    ├──Images
        ├──photo1.jpg
        ├──screenshot.png
```

### 2. Organize Command (`node main.js organize <directoryPath>`)

**Functionality:**
- Automatically categorizes files based on their file extensions
- Creates an `Organized_Files` directory in the specified path
- Moves files into category-specific subdirectories:
  - `media/`
  - `archives/`
  - `documents/`
  - `app/`

**Example:**
```
Downloads/
└──Organized_Files/
    ├──media/
        ├──photo1.jpg
        ├──video.mp4
    ├──documents/
        ├──report.pdf
        ├──spreadsheet.xlsx
```

### 3. Help Command (`node main.js help`)

**Functionality:**
- Displays a list of available commands
- Provides usage instructions for the File Organizer tool

## Comments and Functionality Explained

### Main Script Comments

1. **Module Imports**
```javascript
const { log } = require('console');  // Logging utility
const fs = require('fs');             // File system operations
const path = require('path');          // Path manipulation
```

2. **Input Processing**
```javascript
const inputArr = process.argv.slice(2);  // Captures command-line arguments
const command = inputArr[0];             // First argument is the command
```

### File Categorization Comments

```javascript
// Predefined file type categories
let types = {
    media: ["mp4", "mkv","jpg", "jpeg", "png"],       // Multimedia files
    archives: ['zip', '7z', 'rar', 'tar', 'gz'],      // Compressed files
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'txt'], // Document formats
    app: ['exe', 'dmg', 'pkg', "deb"]                 // Executable files
}
```

### Key Function Comments

1. **Tree Function (`treeFn`):**
```javascript
function treeFn(dirPath){
    // Check if directory path is provided
    if (dirPath === undefined){
        console.log("Please 🙏 Enter the directory path");
        return;
    }
    
    // Validate directory existence
    if (!fs.existsSync(dirPath)){
        console.log("Please 🙏 Enter the correct directory path");
        return;
    }

    // Recursively display directory structure
    TreeHelper(dirPath, "");
}
```

2. **Organize Function (`organizeFn`):**
```javascript
function organizeFn(dirPath){
    // Validate directory path
    if (dirPath === undefined){
        console.log("Please 🙏 Enter the directory path");
        return;
    }

    // Check directory existence
    if (!fs.existsSync(dirPath)){
        console.log("Please 🙏 Enter the correct directory path");
        return;
    }

    // Create destination folder for organized files
    const DestinationPath = path.join(dirPath, "Organized_Files");
    if (!fs.existsSync(DestinationPath)){
        fs.mkdirSync(DestinationPath);
    }

    // Start organizing files
    OrganizeHelper(dirPath, DestinationPath);
}
```

3. **File Categorization (`getCategory`):**
```javascript
function getCategory(name) {
    // Extract file extension
    const ext = path.extname(name).slice(1);
    
    // Match extension with predefined categories
    for (const type in types){
        if (types[type].includes(ext)){
            return type;
        }
    }
}
```

### Error Handling and User Guidance

- Checks for undefined directory paths
- Validates directory existence
- Provides user-friendly error messages
- Uses emoji (🙏) for friendly communication

## Limitations and Potential Improvements

- Currently supports a fixed set of file extensions
- No handling for nested directories in organize mode
- Limited error handling for file system permissions

## Contributing

Suggestions for improvements:
- Add more file type categories
- Implement recursive directory organization
- Enhance error handling
- Add logging mechanisms

## License

Distributed under the MIT License.