const a = "111X";

const rsplit = a.slice(4, 4);
console.log(rsplit);

if (rsplit === undefined) {
  console.log("undefined");
} else if (rsplit === "") {
  console.log("empty");
} else {
  console.log("unknown");
}
