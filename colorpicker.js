"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("DOM has Loaded");
  drawImage();
}
/*********GLOBAL*********VARIABLES*************/
let canvas = document.getElementById("imageCanvas");
let ctx = canvas.getContext("2d");
let img = document.getElementById("myImage");
let w = canvas.width;
let h = canvas.height;
let imageData;
let ctxZoom = document.querySelector("#zoomCanvas").getContext("2d");
let zoomData;
let zoomPixelsX = 10;
let zoomPizelsY = 10;
/*********GLOBAL*********VARIABLES*************/

//drawing/putting image on canvas
function drawImage() {
  ctx.drawImage(img, 0, 0);
  imageData = getImageData();
  console.log(imageData);
  createZoomData();
}

//show x and y coordinates when mouse is moved on canvas
function mouseMoved(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  let coor = "Coordinates:(" + x + "," + y + ")";
  document.getElementById("coorDisplay").innerHTML = coor;
  console.log(x + " and " + y);
  PutImageData();
  drawRectangle(x, y);
  const rgb = getColorAtPixels(x - 5, y - 5);
  showColorInfo(rgb);

  copyPixels(x - 5, y - 5);
  showZoomData();
}

//draws rectangle stroke !!not rect,but strokeRect!!
function drawRectangle(x, y) {
  ctx.strokeStyle = "greenyellow";
  ctx.strokeRect(x - 5, y - 5, 10, 10);
}
//clears coordinates on removing cursor from canvas
function clearCoor() {
  document.getElementById("coorDisplay").innerHTML = "";
}
//getting image data of every pixel on canvas
function getImageData() {
  return ctx.getImageData(0, 0, w, h);
}
//supposed to create array of 1.200.000 elements (
function PutImageData() {
  ctx.putImageData(imageData, 0, 0);
}

function createZoomData() {
  zoomData = ctxZoom.createImageData(zoomPixelsX, zoomPizelsY);
}

function showZoomData() {
  ctxZoom.putImageData(zoomData, 0, 0);
}
//gets pixel rgb values on cursor
function getColorAtPixels(x, y) {
  const pixelIndex = 4 * (x + y * w);
  const r = imageData.data[pixelIndex];
  const g = imageData.data[pixelIndex + 1];
  const b = imageData.data[pixelIndex + 2];

  return {
    r,
    g,
    b
  };
}

// 🎁 Here you go! 🎁 getting rgb,translating to hex,showing.
function showColorInfo(rgb) {
  document.querySelector("#r").textContent = rgb.r;
  document.querySelector("#g").textContent = rgb.g;
  document.querySelector("#b").textContent = rgb.b;

  const hex =
    "#" +
    rgb.r.toString(16).padStart(2, "0") +
    rgb.g.toString(16).padStart(2, "0") +
    rgb.b.toString(16).padStart(2, "0");

  document.querySelector("#hex").textContent = hex;

  document.querySelector("#colorbox").style.backgroundColor = hex;
}
//takes 10x10 pixels on canvas and shows it in the zoom div
function copyPixels(startX, startY) {
  const zoomW = ctxZoom.canvas.width;
  const imageW = ctx.canvas.width;
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const imageX = startX + x;
      const imageY = startY + y;

      const pixelIndex = (x + y * zoomW) * 4;
      const imageIndex = (imageX + imageY * imageW) * 4;

      zoomData.data[pixelIndex + 0] = imageData.data[imageIndex + 0];
      zoomData.data[pixelIndex + 1] = imageData.data[imageIndex + 1];
      zoomData.data[pixelIndex + 2] = imageData.data[imageIndex + 2];
      zoomData.data[pixelIndex + 3] = imageData.data[imageIndex + 3];
    }
  }
}