import { imagesInPath, imagesOutPath, resize } from '../../utilities/resize';
import path from 'path';
import express from 'express';
const routes = express.Router();

routes.get('/', (req, res) => {
    console.log(`query = ${req.query}`);
    console.log(`query.filename = ${req.query.filename}`);
    console.log(`dir name = ${__dirname}`);
    if (req.query.filename !== undefined) {
        // a filename was passed
        const inputFile = path.join(
            __dirname,
            '..',
            '..',
            '..',
            imagesInPath,
            req.query.filename + '.jpg'
        );
        console.log(`inputFile = ${inputFile}`);
        res.sendFile(inputFile);
    } else {
        res.send('Image route');
    }
});

export default routes;
