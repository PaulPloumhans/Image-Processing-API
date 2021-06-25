import sharp from 'sharp';
import { promises as fsPromises } from 'fs';
import path from 'path';

const imagesInPath = 'images';
const imagesOutRootPath = 'thumbnails';

const resize = async (fileName: string, width: number, height: number) => {
    const inputFile = path.join(imagesInPath, fileName + '.jpg');
    const outputFile = path.join(
        imagesOutRootPath,
        fileName + '_' + width + '_' + height + '.jpg'
    );

    await sharp(inputFile).resize(width, height).toFile(outputFile);
};

resize('halfdome', 300, 300);
