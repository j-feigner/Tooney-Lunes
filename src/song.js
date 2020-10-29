window.onload = main;

function main() {
    var canvas = document.createElement("canvas");
    var div = document.getElementById("container");
    div.appendChild(canvas);
    canvas.id = "canvas";
    canvas.style.border = "1px solid black";
    canvas.width = 1800;
    canvas.height = 900;

    var num_cols = 32;
    var column_width = canvas.width / num_cols;
    var row_height = column_width / 1.5;

    var grid = new Grid(0, 0, canvas.width, canvas.height, num_cols, column_width, row_height);

    grid.createColumns();
    grid.draw();

    canvas.addEventListener("click", function(event) {
        var mouse_x = event.offsetX;
        var mouse_y = event.offsetY;

        for(var i = 0; i < grid.columns.length; i++) {
            for(var j = 0; j < grid.columns[i].cells.length; j++) {
                var cell = grid.columns[i].cells[j];
                if(isInBounds(mouse_x, mouse_y, cell.rect)) {
                    cell.is_filled = !cell.is_filled;
                    if(cell.is_filled) {
                        cell.play();
                    }
                    cell.draw();
                }
            }
        }
    });
}

function Grid(x, y, width, height, num_cols, col_width, row_height) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height; 

    this.columns = [];
    this.column_number = num_cols;
    this.column_width = col_width;
    this.row_height = row_height;

    this.createSoundSources = function() {
        var srcs = [];
        srcs[0] = "sound_files/drums/kick.mp3";
        srcs[1] = "sound_files/drums/snare.mp3";
        srcs[2] = "sound_files/drums/tom1.mp3";
        srcs[3] = "sound_files/drums/tom2.mp3";
        srcs[4] = "sound_files/drums/hi_hat.mp3";
        srcs[5] = "sound_files/drums/crash.mp3";
        srcs[6] = "sound_files/drums/ride.mp3";
        return srcs;
    }
    this.sound_srcs = this.createSoundSources();

    this.createColumns = function() {
        for(var i = 0; i < this.column_number; i++) {
            this.columns[i] = new Column(this.x + this.column_width * i, this.y, this.column_width, this.row_height, this.sound_srcs);
            this.columns[i].fillCells();
        }
    }

    this.draw = function() {
        for(var i = 0; i < this.columns.length; i++) {
            for(var j = 0; j < this.columns[i].cells.length; j++) {
                this.columns[i].cells[j].draw();
            }
        }
    }
}

function Column(x, y, width, row_height, sound_srcs) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = row_height * sound_srcs.length;

    this.cells = [];

    this.column_size = sound_srcs.length;

    this.fillCells = function() {
        for(var i =0; i < sound_srcs.length; i++) {
            this.cells[i] = new Cell(this.x, this.y + this.h - row_height * i, this.w, row_height, sound_srcs[i]);
        }
    }
}

function Cell(x, y, width, height, sound_src) {
    this.rect = {
        x: x + 0.5,
        y: y + 0.5,
        w: width - 0.5,
        h: height - 0.5
    }
    this.sound = new Audio();
    this.sound.src = sound_src;
    this.is_filled = false;

    this.draw = function() {
        var c = document.getElementById("canvas");
        ctx = c.getContext("2d");

        ctx.lineWidth = 2;
        ctx.strokeStyle = "grey";
        ctx.fillStyle = "coral";

        ctx.clearRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);

        ctx.beginPath();
        ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h)
        if(this.is_filled) {
            ctx.fill();
        }
        ctx.stroke();
        ctx.closePath();
    }

    this.play = function() {
        this.sound.play();
        this.sound.currentTime = 0;
    }
}

function isInBounds(x, y, rect) {
    var x_lower = rect.x
    var x_upper = rect.x + rect.w;
    var y_lower = rect.y;
    var y_upper = rect.y + rect.h;
    if(x > x_lower && x < x_upper && y > y_lower && y < y_upper) {
        return true;
    } else {
        return false;
    }
}