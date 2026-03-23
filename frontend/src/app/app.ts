import { Component, signal, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  constructor(private http: HttpClient) {}

  private ctx!: CanvasRenderingContext2D;
  protected readonly title = signal('lenet5-visualizer');
  private drawing = false;
  result = signal(-1);

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext("2d")!;
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, 280, 280);
    this.ctx.strokeStyle = "#FFFFFF";
    this.ctx.lineWidth = 18;
    this.ctx.lineCap = 'butt';
  }

  clear() {
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, 280, 280);
    this.result.update(curr => -1);
  }

  startDraw(event: MouseEvent) {
    this.drawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
  }

  draw(event: MouseEvent) {
    if (!this.drawing) return;
    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();
  }

  stopDraw() {
    this.drawing = false;
  }

  predict() {
    const canvas = this.canvasRef.nativeElement;

    const offScreen = document.createElement('canvas');
    offScreen.width = 28;
    offScreen.height = 28;

    const offCtx = offScreen.getContext('2d')!;
    offCtx.drawImage(canvas, 0, 0, 28, 28);

    const imageData = offCtx.getImageData(0, 0, 28, 28);
    const pixels: number[] = [];

    for (let i = 0; i < imageData.data.length; i+=4) {
      pixels.push(imageData.data[i] / 255.0);
    }

    this.http.post<{ result: number }>('http://localhost:3000/predict', { pixels })
    .subscribe(res => this.result.update(curr => res.result))
  }

}
