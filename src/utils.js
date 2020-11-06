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

function resizeCanvas(canvas_name, container_name) {
    var container = document.getElementById(container_name);
    var canvas = document.getElementById(canvas_name);
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
}