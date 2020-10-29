window.onload = main;

function main() {
    var canvas = document.createElement("canvas");
    var div = document.getElementById("container");
    div.appendChild(canvas);
    canvas.id = "canvas";
    canvas.style.border = "1px solid black";
    canvas.width = 1000;
    canvas.height = 800;

    var grid = new Grid(50, 50, 600, 600);
    grid.column_width = 25;
    grid.row_height = grid.column_width;

    grid.createColumns();
    grid.draw();

    canvas.addEventListener("click", function(event) {
        var mouse_x = event.offsetX;
        var mouse_y = event.offsetY;

        for(var i = 0; i < grid.columns.length; i++) {
            for(var j = 0; j < grid.columns[i].cells.length; j++) {
                if(isInBounds(mouse_x, mouse_y, grid.columns[i].cells[j].rect)) {
                    grid.columns[i].cells[j].play();
                }
            }
        }
    })
}

function Grid(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height; 

    this.columns = [];
    this.column_width = null;
    this.row_height = null;

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
        for(var i = 0; i < 32; i++) {
            this.columns[i] = new Column(this.x + this.column_width * i, this.y + this.h, this.column_width, this.row_height, this.sound_srcs);
            this.columns[i].fillCells();
        }
    }

    this.draw = function() {
        var c = document.getElementById("canvas");
        ctx = c.getContext("2d");

        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";

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
        x: x,
        y: y,
        w: width,
        h: height
    }
    this.sound = new Audio();
    this.sound.src = sound_src;

    this.draw = function() {
        var c = document.getElementById("canvas");
        ctx = c.getContext("2d");

        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";

        ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h)
        ctx.stroke();
    }

    this.play = function() {
        this.sound.play();
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