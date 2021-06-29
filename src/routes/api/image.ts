import resize from '../../utilities/resize_promises';
import path from 'path';
import express from 'express';
const routes = express.Router();

const imagesInPath = 'images';
const imagesOutPath = 'thumbnails';

routes.get('/', (req, res) => {
    if (
        req.query.filename !== undefined &&
        req.query.width !== undefined &&
        req.query.height !== undefined
    ) {
        // a filename, width and height were passed to the API
        resize(
            req.query.filename as string,
            parseInt(req.query.width as string),
            parseInt(req.query.height as string),
            imagesInPath,
            imagesOutPath
        )
            .then((resolve) => {
                // resolve is a filename ending in .jpg, with a path relative to the project main folder
                // so we need to build the full path to the file in order to use sendFile
                const inputFileFullPath = path.join(
                    __dirname,
                    '..',
                    '..',
                    '..',
                    resolve
                );
                res.sendFile(inputFileFullPath);
            })
            .catch((reject) => res.send(reject.message));
    } else {
        res.send('Image route');
    }
});

export default routes;
