const canvas = document.getElementById("output");
const video = document.getElementById("vidbox");
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;
let model = null;


async function detectAndDraw () {
    const predictions = await model.estimateFaces({
        input: video
      });

    ctx.drawImage(video,0,0,600,400);
    predictions.forEach(face => {
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.strokeStyle = "green";
        ctx.rect(
            face.boundingBox.topLeft[0],
            face.boundingBox.topLeft[1],
            face.boundingBox.bottomRight[0] - face.boundingBox.topLeft[0],
            face.boundingBox.bottomRight[1] - face.boundingBox.topLeft[1]
        );
        ctx.stroke();
        console.log(face.boundingBox.topLeft[1])
    });
    requestAnimationFrame(detectAndDraw);
}

async function main() {
    navigator.mediaDevices.getUserMedia({video:true})
    .then((stream)=> {
        video.srcObject = stream;
    })
    model = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediaPipeFacemesh); 
    detectAndDraw();

}

main();