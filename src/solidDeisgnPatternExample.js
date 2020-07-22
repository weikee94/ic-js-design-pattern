// load image
function loadImage(src) {
  var promise = new Promise(function (resolve, reject) {
    var img = document.createElement("img");
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function () {
      reject("Load failed");
    };
    img.src = src;
  });

  return promise;
}

var src =
  "https://cdn.vox-cdn.com/thumbor/E9RM8-qg-iyLEAzP4d7tobqI09o=/0x0:2012x1341/1400x933/filters:focal(0x0:2012x1341):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg";
var result = loadImage(src);

result
  .then(function (img) {
    console.log("image width: ", img.width);
    return img; // 这里返回图片是为了让下面得到image
  })
  .then(function (img) {
    console.log("image height: ", img.height);
  })
  .catch(function (err) {
    console.log(err);
  });
