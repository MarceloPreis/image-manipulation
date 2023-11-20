const fs = require('fs');
const ppm = require('ppm');

function readPPM(filename) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filename);
        ppm.parse(stream, (err, image) => {
            if (err) {
                reject(err);
            } else {
                resolve(image);
            }
        });
    });
}

function subtractImages(image1, image2) {
    const result = image1.map((row, i) => {
        return row.map((pixel, j) => {
            return pixel.map((value, k) => {
                return value - image2[i][j][k] 
            });
        });
    });
    return result;
}

const imagePath1 = '../images/EntradaRGB.ppm'
const imagePath2 = '../images/EntradaRGB.ppm'

Promise.all([readPPM(imagePath1), readPPM(imagePath2)])
    .then(([image1, image2]) => {
        const result = subtractImages(image1, image2);
        const serialized = ppm.serialize(result);

        const writeStream = fs.createWriteStream('subtracted.ppm');
        serialized.pipe(writeStream);    
    })
    .catch(err => {
        console.error(err);
    });
