import Score from './Score';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const score = Score.getInstance();

export default class Renderer {
    static instance = null;
    constructor() {
        this.context = ctx;
        this.color1 = '#003511';
        this.color2 = '#00B962';
        this.step = 30;
        this.side = 30;
    }

    static getInstance = () => {
        if (!Renderer.instance) {
            Renderer.instance = new Renderer();
        }
        return Renderer.instance;
    };

    render = (coordsArr, color) => {
        coordsArr.forEach((coords) => {
            const x = coords[0];
            const y = coords[1];
            this.drawSquare(x, y, color);
            this.drawDots(x, y);
        });
    };

    drawSquare = (xp, yp, color) => {
        const cXp = xp * this.step;
        const cYp = yp * this.step;
        this.context.fillStyle = color;
        this.context.fillRect(cXp, cYp, this.side, this.side);

        this.context.beginPath();
        this.context.lineWidth = '4';
        this.context.strokeStyle = this.color1;
        this.context.rect(cXp, cYp, this.side, this.side);
        this.context.stroke();
        this.context.closePath();
    };

    drawDots = (xp, yp) => {
        const cXp = xp * this.step;
        const cYp = yp * this.step;

        this.context.fillStyle = this.color1;
        this.context.fillRect(cXp, cYp, 4, 4);

        this.context.beginPath();
        this.context.fillStyle = this.color1;
        this.context.fillRect(cXp + this.side - 4, cYp, 4, 4);
        this.context.closePath();
        this.context.beginPath();
        this.context.fillStyle = this.color1;
        this.context.fillRect(cXp + this.side - 4, cYp + this.side - 4, 4, 4);
        this.context.closePath();
        this.context.beginPath();
        this.context.fillStyle = this.color1;
        this.context.fillRect(cXp, cYp + this.side - 4, 4, 4);
        this.context.closePath();
        this.context.fillStyle = this.color2;
    };

    clearShape = (shapePosition) => {
        shapePosition.forEach((coords) => {
            const x = coords[0] * this.step;
            const y = coords[1] * this.step;
            this.context.fillStyle = this.color1;
            this.context.fillRect(x, y, this.side + 1, this.side + 1);
            this.context.fillStyle = this.color2;
        });
    };

    init = () => {
        this.context.beginPath();
        this.context.rect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.fillStyle = this.color1;
        this.context.fill();
    };

    drawHighScore = (rect) => {
        const fontBig = '48px "VT323", monospace';
        const fontSmall = '20px "VT323", monospace';
        const fontColor = '#d9ffe5';

        this.context.font = fontBig;
        this.context.fillStyle = this.color1;
        this.context.fillText('GAME OVER', rect.x + 35, rect.y + 80);

        this.context.font = fontSmall;
        this.context.fillStyle = fontColor;
        this.context.fillText(`score: ${score.previous}`, rect.x + 33, rect.y + 130);

        this.context.font = fontSmall;
        this.context.fillStyle = fontColor;
        this.context.fillText("press 'P' to play again", rect.x + 33, rect.y + 160);
        if (score.isHighestScore) {
            this.context.font = fontSmall;
            this.context.fillStyle = fontColor;
            this.context.fillText(`Highest score!`, rect.x + 62, rect.y + 32);
        }
    };

    drawGameOverScreen() {
        this.context.beginPath();
        this.context.rect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.fillStyle = this.color2;
        this.context.fill();

        const rect = {
            x: (this.context.canvas.width - (this.context.canvas.width - 50)) / 2,
            y: this.context.canvas.height / 1.5 / 2,
            width: this.context.canvas.width - 50,
            height: this.context.canvas.height - this.context.canvas.height / 1.5,
        };

        this.context.beginPath();
        this.context.lineWidth = '4';
        this.context.strokeStyle = this.color1;
        this.context.rect(rect.x, rect.y, rect.width, rect.height);
        this.context.stroke();
        this.context.closePath();

        const dotSize = 6;

        /// DARK DOTS
        this.context.beginPath();
        this.context.fillStyle = this.color1;
        this.context.fillRect(rect.x + 1, rect.y + 1, dotSize, dotSize);
        this.context.closePath();

        this.context.beginPath();
        this.context.fillStyle = this.color1;
        this.context.fillRect(rect.x + rect.width - dotSize - 1, rect.y + 1, dotSize, dotSize);
        this.context.closePath();

        this.context.beginPath();
        this.context.fillStyle = this.color1;
        this.context.fillRect(
            rect.x + rect.width - dotSize - 1,
            rect.y + rect.height - dotSize - 1,
            dotSize,
            dotSize
        );
        this.context.closePath();

        this.context.beginPath();
        this.context.fillStyle = this.color1;
        this.context.fillRect(rect.x + 1, rect.y + rect.height - dotSize - 1, dotSize, dotSize);
        this.context.closePath();

        /// LIGHT DOTS
        this.context.beginPath();
        this.context.fillStyle = this.color2;
        this.context.fillRect(rect.x - 3, rect.y - 3, dotSize, dotSize);
        this.context.closePath();

        this.context.beginPath();
        this.context.fillStyle = this.color2;
        this.context.fillRect(rect.x + rect.width - dotSize + 3, rect.y - 3, dotSize, dotSize);
        this.context.closePath();

        this.context.beginPath();
        this.context.fillStyle = this.color2;
        this.context.fillRect(
            rect.x + rect.width - dotSize + 3,
            rect.y + rect.height - dotSize + 3,
            dotSize,
            dotSize
        );
        this.context.closePath();

        this.context.beginPath();
        this.context.fillStyle = this.color2;
        this.context.fillRect(rect.x - 3, rect.y + rect.height - dotSize + 3, dotSize, dotSize);
        this.context.closePath();
        this.context.fillStyle = this.color2;

        this.drawHighScore(rect);
    }

    clearCanvas = () => {
        this.context.beginPath();
        this.context.rect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.fillStyle = this.color1;
        this.context.fill();
        this.context.fillStyle = this.color2;
    };
}
