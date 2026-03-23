const express = require('express');
const cors = require('cors');
const ort = require('onnxruntime-node');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;


let session;
const loadModel = async () => {
    session = await ort.InferenceSession.create('./models/lenet5.onnx')
    console.log("Custom LeNet5 Model Loaded!")
};

app.post('/predict', async (req, res) => {
    try {
        const { pixels } = req.body;

        const input = padTo32x32(pixels);

        const tensor = new ort.Tensor('float32', Float32Array.from(input), [1, 1, 32, 32]);
        const result = await session.run({'input': tensor});
        const predicted = argmax(result.output.data);
        res.status(200).json({
            result: predicted
        })
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
})

const padTo32x32 = (arr) => {
    const padded = new Array(32*32).fill(0)
    for (let row = 0; row <= 28; row++) {
        for (let col = 0; col <= 28; col++) {
            padded[(row+2) * 32 + (col + 2)] = arr[row * 28 + col];
        }
    }
    return padded;
}

const argmax = (arr) => {
    return arr.indexOf(Math.max(...arr));
};

loadModel().then(() => {
    app.listen(PORT, () => console.log(`Server on ${PORT}`))
});
