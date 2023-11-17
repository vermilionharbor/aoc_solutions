const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

const table = lines[0];

let i;
let image = [];
for (i=2; i<lines.length; i++) {
    image.push(lines[i]);
}

console.log(image);

const height = image.length;
const width = image[0].length;
const invertMode = table[0] === '#';

console.log(`width ${width} height ${height}`);
if (width !== height) {
    console.log(`*** non square image ***`);
}
const indexToKey = (y, x) => {
    return `${y}_${x}`;
}

const imageArray = [];
let j;
for (j=0; j<height; j++) {
    for (i=0; i<width; i++) {
        if (image[j][i] === '#') {
            imageArray.push({x: i, y: j});
        }
    }
}

console.log(imageArray);
console.log(imageArray.length);

const currentImage = {
    frameNumber: 0,
    width: width,
    height: height,
    pixels: imageArray,
}

const extendImage = (image) => {
    let newImage = {
        frameNumber: image.frameNumber + 1,
        width: image.width + 2,
        height: image.height + 2,
        pixels: [],
    }

    let i;
    for (i=0; i<image.pixels.length; i++) {
        const pixel = image.pixels[i];
        newImage.pixels.push({
            x: pixel.x+1,
            y: pixel.y+1,
        })
    }

    return newImage;
}

const fetchPixel = (x, y, width, height, imageMap, doInvert=false) => {
    let i, j;
    let bitBuffer = '';
    let samples = 0;
    let offPixel;

    if (doInvert) {
        offPixel = '1';
    } else {
        offPixel = '0';
    }
    for (j=y-1; j<=y+1; j++) {
        for (i=x-1; i<=x+1; i++) {
            // console.log(`x ${i}, y ${j}`);
            if ((i < 1) || (i >= width - 1) || (j < 1) || (j >= height - 1)) {
                // off image, infinite bits generated depend on mode
                bitBuffer += offPixel;
            } else {
                const key = indexToKey(j, i);
                if (imageMap[key] !== undefined) {
                    bitBuffer += '1';
                } else {
                    bitBuffer += '0';
                }
            }
            samples++;
        }
    }

    const index = parseInt(bitBuffer, 2);
    if ((x===0) && (y===0)) {
        console.log(`(0,0) => ${bitBuffer} ${index}`)
    }
    if ((x===1) && (y===1)) {
        console.log(`(1,1) => ${bitBuffer} ${index}`)
    }
    if ((x===width-1) && (y===height-1)) {
        console.log(`(${width-1},${height-1}) => ${bitBuffer} ${index}`)
    }

    // console.log(index);
    const pixelVal = table[index];
    return pixelVal;
}

const enhanceImage = (image) => {
    let newImage = extendImage(image);
    let i, j;
    const imageMap = {}
    let doInvert = (invertMode && (newImage.frameNumber % 2 === 0));
    console.log(`${doInvert} ${newImage.frameNumber} ${newImage.frameNumber % 2}`)
    for (i=0; i<newImage.pixels.length; i++) {
        const key = indexToKey(newImage.pixels[i].y, newImage.pixels[i].x);
        imageMap[key] = 1;
    }
    // console.log('here');
    // console.log(newImage.pixels);
// console.log(imageMap);
    newImage.pixels = [];
    for (j=0; j<newImage.height; j++) {
        for (i=0; i<newImage.width; i++) {
            const pixel = fetchPixel(i, j, newImage.width, newImage.height, imageMap, doInvert);
            if (pixel === '#') {
                newImage.pixels.push({
                    x: i,
                    y: j,
                })
            }
        }
    }

    return newImage;
}

const prettyPrint = (image) => {
    const imageMap = {};
    let i, j;
    for (i=0; i<image.pixels.length; i++) {
        const key = indexToKey(image.pixels[i].y, image.pixels[i].x);
        imageMap[key] = 1;
    }

    for (j=0; j<image.height; j++) {
        let lineBuffer = '';
        for (i=0; i<image.height; i++) {
            const key = indexToKey(j, i);
            if (imageMap[key] !== undefined) {
                lineBuffer += '#'
            } else {
                lineBuffer += '.';
            }
        }
        console.log(lineBuffer);
    }
}

// prettyPrint(currentImage);
// const image2 = enhanceImage(currentImage);
// console.log("");
// console.log('image2');
// prettyPrint(image2);
// const image3 = enhanceImage(image2);
// console.log("");
// console.log('image3');
// prettyPrint(image3);
// console.log(image3.pixels.length);
let frame;
let cur = currentImage;
for (frame=0; frame<50; frame++) {
    let nextImage = enhanceImage(cur);
    console.log("");
    console.log(`frame ${frame + 1}`);
    prettyPrint(nextImage);
    cur = nextImage;
}

console.log(`final pixel count ${cur.pixels.length}`);