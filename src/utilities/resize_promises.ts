import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

const resize = async (
    fileName: string,
    width: number,
    height: number,
    imagesInPath: string,
    imagesOutPath: string
): Promise<string> => {
    const inputFile = path.join(imagesInPath, fileName + '.jpg');
    // buid name of output file based on input file and desired resolution
    const outputFile = path.join(
        imagesOutPath,
        fileName + '_' + width + '_' + height + '.jpg'
    );
    return new Promise((resolve, reject) => {
        // check if imagesOutRootPath is there; if not, create it
        if (existsSync(imagesOutPath) !== true) {
            console.log(`Creating folder ${imagesOutPath}`);
            if (mkdirSync(imagesOutPath) !== undefined) {
                reject(
                    new Error(`Cannot create output folder ${imagesOutPath}`)
                );
            }
        }
        // check if outputFile is on disk
        if (existsSync(outputFile)) {
            // if yes, return outputFile immediately
            console.log(`File ${outputFile} is already present`);
            resolve(outputFile);
        } else {
            // if no, resize, save to disk, and return outputFile
            try {
                sharp(inputFile)
                    .resize(width, height)
                    .toFile(outputFile)
                    .then(() => resolve(outputFile))
                    .catch((err) => reject(err));
            } catch (err) {
                reject(err);
            }
        }
    });
};

// usage example
// resize('halfdome', 250, 250, 'images', 'thumbnails')
//     .then((res) => console.log(res))
//     .catch((err) => console.error(err.message));

export default resize;
