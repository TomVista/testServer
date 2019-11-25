var stdout = "";
var stderr = "";
var worker = new Worker("ffmpeg-worker-mp4.js");
worker.onmessage = function (e) {
  var msg = e.data;
  console.log(msg.data)
  switch (msg.type) {
    case "ready":

      break;
    case "stdout":

      break;
    case "stderr":

      break;
    case "done":
      console.log(e,'e')
      const result = e.data.data
      const outBuffer = result.MEMFS[0].data;
      const outBlob = bufferToBlob(outBuffer)
      objectURL = window.URL.createObjectURL(outBlob)
      const link = document.createElement('a')
      link.href = objectURL
      link.download = 'out.mp4'
      link.click()
      break;
    case "exit":
      console.log("Process exited with code " + msg.data);
      break;
  }
};

window.addEventListener('message', function (message) {
  console.log(message)
})


const select = document.getElementById('select')

select.addEventListener('change', function (e) {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onload = function (e) {
    const arrayBuffer = e.currentTarget.result
    worker.postMessage({
      type: 'run',
      arguments: `-i test.mp4 -ss 0 -t 1 -c copy out.mp4`.split(' '),
      MEMFS: [{
        name: "test.mp4",
        data: arrayBuffer
      }]
    })
  }
})

function bufferToBlob(arrayBuffer) {
  const file = new File([arrayBuffer], 'out.mp4', {
    type: 'mp4',
  });
  return file;
}
