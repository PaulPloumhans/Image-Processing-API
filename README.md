# Udacity Full Stack javascript developer - Image Processing API

This is the first project of the Udacity Full Stack JavaScript Developer Nanodegree program: Image Processing API.

It consists in an Express server that exposes an API to resize JPEG images. If the same image is resized multiple times to the same
resolution, a cached copy of the resized image is served from the second time onwards.

In order for the API to access them, the images need to be in folder
`images`. The resized images will be in the folder `thumbnails` (which will be created automatically the first time it is used), with a name that uniquely identifies the original image and the
new resolution.

More details are available at https://github.com/udacity/nd-0067-c1-building-a-server-project-starter.

# Implementation

Key points:
* Uses Express as web server
* Uses Sharp for image manipulations
* Uses Jasmine for unit tests
* Development done with Typescript to reduce errors

# Deployment

## Installation
The required packages can be installed using
`npm install`

## Testing
A total of six test can be run with
`npm run jasmine`

## Dependencies and versions used

The project depends on the following packages:
* express
* jasmine
* path
* prettier
* sharp
* supertest

See the file `package.json` for the exact versions used.

## Starting the server
In order to start the server that exposes the API, type
`npm run start`

# Usage

## API

Once the server is started, point your browser to the URL
`http://localhost:3000/api/image/?filename=halfdome&width=300&height=300`
This will resize the file `halfdome.jpg` in folder `images` to 300 x 300 and save the resized version in folder `thumbnails`
in a file named `halfdome_300_300.jpg`.

## Module resize_premises

The resizing capabilities are available through a module that is in file `src/utilities/resize_promises.ts`. Its usage is like so:
```
resize('halfdome', 250, 250, 'images', 'thumbnails')
    .then((res) => console.log(res)) // displays the filename of the resized file
    .catch((err) => console.error(err.message)); // displays the error message
```

# Folder structure

The main folders are:
* src contains all the source files (in Typescript)
** src/routes contains the API capabilities for the different routes
** src/tests contains the tests
** src/utilities contains the utility to resize images using disk caching to avoid re-doing the same resizing on a given file
** src/index.ts starts the express server
