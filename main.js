
const { log } = require('console');
const fs = require('fs');
const path = require('path');

const inputArr = process.argv.slice(2);
// console.log(inputArr);
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help

const command = inputArr[0];

let types = {
    media: ["mp4", "mkv","jpg", "jpeg", "png"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

switch (command) {
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("Please 🙏 Input Right command");
        break;
}

function treeFn(dirPath){
    // console.log("Tree command Implemented for" ,dirPath);
    if ( dirPath === undefined){
        console.log("Please 🙏 Enter the directory path");
        return;
    }
    //checking if the directory exists
    if ( !fs.existsSync(dirPath) ){
        console.log("Please 🙏 Enter the correct directory path");
        return;
    }

    TreeHelper(dirPath, "");
   
}

function organizeFn(dirPath){
    // console.log("Organize command Implemented for" ,dirPath);

    if ( dirPath === undefined){
        console.log("Please 🙏 Enter the directory path");
        return;
    }

    //checking if the directory exists
    if ( !fs.existsSync(dirPath) ){
        console.log("Please 🙏 Enter the correct directory path");
        return;
    }


    // creating the directory to store the files
    const DestinationPath = path.join(dirPath,"Organized_Files");
    if (!fs.existsSync(DestinationPath)){
        fs.mkdirSync(DestinationPath);
    }

    // calling the Helper function to organize
    OrganizeHelper(dirPath,DestinationPath);

}

function helpFn(){
    console.log(
      `List of All the commands
            node main.js tree "directoryPath"
            node main.js organize "directoryPath"
            node main.js help
        `
    );
}


function OrganizeHelper(src, dest){

    // Reading all the FIles in the folder
    const files = fs.readdirSync(src);
    // console.log(files);

    //Looping through the files
    files.forEach((file) => {
        const fileAddress = path.join(src, file);
        const stats = fs.lstatSync(fileAddress);
        // console.log(stats);
        if (stats.isFile()) {
            // console.log(file);
            // console.log(fileAddress);
            // console.log(stats);
            const category =  getCategory(file);
            if (category){
              console.log(file, "belongs to ---->", category);
              sendFiles(fileAddress, dest, category);
            }
        }
    })
}



function getCategory(name) {
    const ext = path.extname(name).slice(1);
    // console.log(ext);
    for ( const type in types ){
        // console.log(type);
        if ( types[type].includes(ext) ){
            // console.log(type);
            return type;
        }
    }

}

function sendFiles( src, dest, category){

    // path to category folder
    const categoryPath = path.join(dest, category);

    // create category folder
    if (!fs.existsSync(categoryPath)){
      fs.mkdirSync(categoryPath);
    }


    // creating file path
    const fileName = path.basename(src);
    const destPath = path.join(categoryPath, fileName);


    // copying Files
    fs.copyFileSync(src, destPath);


    // Deleting Files in Src Folder
    fs.unlinkSync(src); 


    console.log( src, "Copied to" , destPath )

}


function TreeHelper(directoryPath,indentation) {

    // Checking weather its file or Folder
    const stats = fs.lstatSync(directoryPath);
    // console.log(stats);
    if (stats.isFile()) {
        // console.log(directoryPath);
        const fileName = path.basename(directoryPath);
        console.log(indentation+"├──" + fileName);
    }else{
        const dirName = path.basename(directoryPath);
        console.log(indentation+"└──" + dirName);
        const children = fs.readdirSync(directoryPath);
        children.forEach( (child) => {
            const childPath = path.join(directoryPath, child);
            // console.log(childPath);
            TreeHelper(childPath,indentation+"\t");
        } ); 
    }
}