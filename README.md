# lenet5-visualizer

> Note: This project is a demo of a custom-trained LeNet-5 model, tested through a canvas-based interface where users draw digits and get real-time predictions.

A handwritten digit recognizer built with a partial-from-scratch LeNet-5 implementation in PyTorch, served via a Node.js backend and an Angular frontend.

## Stack

- **Model** — LeNet-5 trained on MNIST, exported to ONNX
- **Backend** — Node.js + Express + onnxruntime-node
- **Frontend** — Angular

## Project Structure

```
lenet5-visualizer/
├── frontend/        # Angular app
├── backend/         # Node.js server
│   └── src/
│       └── server.js
│       └── models/
│           └── lenet5.onnx
│           └── lenet5.onnx.data
└── lenet5-mnist.ipynb # PyTorch training notebook
```

## Setup

### Dataset
> Note: Do this step if you want to test out the python notebook.

Download MNIST from 
1. https://web.archive.org/web/20200623002706/http://yann.lecun.com/exdb/mnist/ (or)
2. https://www.kaggle.com/datasets/hojjatk/mnist-dataset?resource=download
and place the extracted files in `mnist_dataset/`.


### Backend

```bash
cd backend
npm install
node src/server.js
# runs on http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
ng serve
# runs on http://localhost:4200
```

## Usage

1. Draw a digit on the canvas
2. Click **Predict**
3. The model returns the predicted digit
4. Click **Clear** to reset
