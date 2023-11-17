const fs = require('fs');

const lines = fs.readFileSync("input2.txt").toString().split("\n");

const validYear = (lower, upper) => (val) => {
    if (val.length === 4) {
        let year = parseInt(val);
        if ((year >= lower) && (year <= upper))
            return true;
    }
    console.log(`invalid year ${val}`)
    return false;
}

const validBirth = validYear(1920, 2002);

const validIssue = validYear(2010, 2020);
const validExpr = validYear(2020, 2030);

const validHeight = (val) => {
    if ((val.endsWith("cm")) || val.endsWith("in")) {
        let heightStr = val.slice(0, val.length-2);
        let height = parseInt(heightStr, 10);
        if (val.endsWith("cm")) {
            // cm
            if ((height >= 150) && (height <= 193)) {
                return true;
            }
        } else {
            if ((height >= 59) && (height <= 76)) {
                return true;
            }
        }
    }
    console.log(`invalid height ${val}`)
    return false;
}

const validHair = (val) => {
    if (val.startsWith("#") && val.length === 7) {
        const color = val.slice(1, val.length);
        const regex = new RegExp("[0-9a-f]{6}");
        let valid = regex.test(val);
        if (valid === false) {
            console.log(`invalid hair! ${val}`);
        }
        return valid;
    }

    console.log(`invalid hair ${val}`)
    return false;
}

const validEye = (val) => {
    let valid = false;
    switch (val) {
        case "amb":
        case "blu":
        case "brn":
        case "gry":
        case "grn":
        case "hzl":
        case "oth":
            valid = true;
            break;
    }
    if (valid === false) {
        console.log(`invalid eye ${val}`);
    }
    return valid;
}

const validPid = (val) => {
    if (val.length === 9) {
        const regex = new RegExp("[0-9]{9}")
        const valid = regex.test(val);
        if (valid === false) {
            console.log(`invalid pid ${val}`);
        }
        return valid;
    }

    console.log(`invalid pid ${val}`)
    return false;
}

let numValid = 0;
let totalPassports = 0;
let passPort = {};
lines.forEach(l => {
    // console.log(l);
    // if (l.length > 0) {
    //     console.log(l)
    // } else {
    //     console.log("newline");
    // }
    if (l.length > 0) {
        console.log(l);
        let fields = l.split(" ");
        fields.forEach(f => {
            if (f.length > 0) {
                // console.log(f);
                let fieldTerms = f.split(":");
                let fieldKey = fieldTerms[0];
                let fieldVal = fieldTerms[1];

                switch (fieldKey) {
                    case "byr":
                    case "iyr":
                    case "eyr":
                    case "hgt":
                    case "hcl":
                    case "ecl":
                    case "pid":
                    case "cid":
                        passPort[fieldKey] = fieldVal;
                        break
                }
            }
        })
    } else {
        console.log('passport done');
        console.log(passPort);
        totalPassports ++;
        // check validity
        if ((Object.keys(passPort).length >= 7) &&
            (passPort["byr"] !== undefined) &&
            (validBirth(passPort["byr"])) &&
            (passPort["iyr"] !== undefined) &&
            (validIssue(passPort["iyr"])) &&
            (passPort["eyr"] !== undefined) &&
            (validExpr(passPort["eyr"])) &&
            (passPort["hgt"] !== undefined) &&
            (validHeight(passPort["hgt"])) &&
            (passPort["hcl"] !== undefined) &&
            (validHair(passPort["hcl"])) &&
            (passPort["ecl"] !== undefined) &&
            (validEye(passPort["ecl"])) &&
            (passPort["pid"] !== undefined) &&
            (validPid(passPort["pid"]))
        ) {
            numValid++;
        }
        passPort = {};
    }
});

console.log(`Total ${totalPassports} Number of Valid Passports ${numValid}`);

