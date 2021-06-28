import sharp from 'sharp';
import { promises as fsPromises } from 'fs';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

const imagesInPath = 'images';
const imagesOutRootPath = 'thumbnails';

const resize = async (
    fileName: string,
    width: number,
    height: number
): Promise<string> => {
    const inputFile = path.join(imagesInPath, fileName + '.jpg');
    const outputFile = path.join(
        imagesOutRootPath,
        fileName + '_' + width + '_' + height + '.jpg'
    );
    let ret = '';
    // check if imagesOutRootPath is there; if not, create it
    if (existsSync(imagesOutRootPath) !== true) {
        console.log(`Creating folder ${imagesOutRootPath}`);
        if (mkdirSync(imagesOutRootPath) !== undefined) {
            ret = `Cannot create folder ${imagesOutRootPath}`;
            return ret;
        }
    }
    // check if outputFile is there; if yes, return immediately
    if (existsSync(outputFile)) {
        console.log(`File ${outputFile} is already present`);
        return ret;
    } else {
        try {
            await sharp(inputFile).resize(width, height).toFile(outputFile);
        } catch (err) {
            ret = err.name + ' : ' + err.message;
        }
    }
    return ret;
};

const callResize = async () => {
    const msg = await resize('halfdome', 400, 500);
    console.log('msg = ', msg);
};

callResize();
