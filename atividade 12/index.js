const ppm = require('ppm')
const fs = require('fs')

function rotateImage90(image) {
    const length = image.length;
    const rotatedImage = Array.from({ length }, _ => []);

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            rotatedImage[i][j] = image[length - (1 + j)][i];
        }
    }

    return rotatedImage;
}

function rotateImage180(image) {
    const length = image.length;
    const rotatedImage = Array.from({ length }, _ => []);

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            rotatedImage[i][j] = image[length - (1 + i)][length - (1 + j)];
        }
    }

    return rotatedImage;
}

function writePpm(filepath, file) {
    let ppm = `P3\n${file.width} ${file.height}\n255\n`;

    for (let i = 0; i < file.height; i++) {
        for (let j = 0; j < file.width; j++) {
            ppm += `${file.data[i][j].join(' ')} `;
        }
        ppm += '\n';
    }

    fs.writeFileSync(filepath, ppm)
}

const fileStream =  fs.createReadStream('../images/EntradaRGB.ppm')
ppm.parse(fileStream, (err, data) => {
    const image180 = rotateImage180(data)
    const image90 = rotateImage90(data)

    writePpm('./image90.ppm', { height: image90.length, width: image90[0].length, data: image90 })
    writePpm('./image180.ppm', { height: image180.length, width: image180[0].length, data: image180 })
})