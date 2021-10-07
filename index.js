const canvas = document.getElementById("output");
const video = document.getElementById("vidbox");
const ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480;
let model = null;


async function detectAndDraw () {
    const predictions = await model.estimateFaces({
        input: video
      });

    ctx.drawImage(video,0,0,640,480);
    predictions.forEach(face => {
        const keypoints = face.scaledMesh;
        for (let i =0 ; i < keypoints.length; i++) {
            const x = keypoints[i][0];
            const y = keypoints[i][1];
            ctx.beginPath();
            ctx.arc(x,y,1,0,3 * Math.PI);
            ctx.fillStyle = "aqua";
            ctx.fill();
        }
        
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