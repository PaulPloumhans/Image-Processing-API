import sharp from 'sharp';
import { promises as fsPromises } from 'fs';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

const imagesInPath = 'images';
const imagesOutPath = 'thumbnails';

const resize = async (
    fileName: string,
    width: number,
    height: number
): Promise<string> => {
    const inputFile = path.join(imagesInPath, fileName + '.jpg');
    const outputFile = path.join(
        imagesOutPath,
        fileName + '_' + width + '_' + height + '.jpg'
    );
    return new Promise((resolve, reject) => {
        // check if imagesOutRootPath is there; if not, create it
        if (existsSync(imagesOutPath) !== true) {
            console.log(`Creating folder ${imagesOutPath}`);
            if (mkdirSync(imagesOutPath) !== undefined) {
                reject(new Error(`Cannot create folder ${imagesOutPath}`));
            }
        }
        // check if outputFile is there; if yes, return immediately
        if (existsSync(outputFile)) {
            console.log(`File ${outputFile} is already present`);
            resolve(outputFile);
        } else {
            try {
                sharp(inputFile)
                    .resize(width, height)
                    .toFile(outputFile)
                    .then((res) => resolve(outputFile))
                    .catch((err) => reject(err));
            } catch (err) {
                reject(err);
            }
        }
    });
};

resize('halfdome', 250, 250)
    .then((res) => console.log(res))
    .catch((err) => console.error(err.message));

export { imagesInPath, imagesOutPath, resize };
