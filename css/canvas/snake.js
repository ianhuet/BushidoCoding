function checkSupported() {

    canvas = document.getElementById('canvas');

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        // Canvas is supported


        // This sets the fill color to red
        ctx.fillStyle = "rgb(200,0,0)";

        // Sets the grid dimensions as one value
        var gridSize = 10;

        // The current position of the Snake's head, as xy coordinates
        var currentPosition = [];
        currentPosition['x'] = 50;
        currentPosition['y'] = 50;

        // This draws a square with the parameters from the variables set above
        ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);

        // To capture the keystrokes
        document.onkeydown = function (event) {
            var keyCode;

            if (event == null) {
                keyCode = window.event.keyCode;
            }
            else {
                keyCode = event.keyCode;
            }

            switch (keyCode) {
                // left
                case 37:
                    // set new position, and draw square at that position.
                    currentPosition['x'] = currentPosition['x'] - gridSize;
                    ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
                    console.log('left', currentPosition['x'], currentPosition['y']);
                    break;

                // up
                case 38:
                    currentPosition['y'] = currentPosition['y'] - gridSize;
                    ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
                    console.log('up', currentPosition['x'], currentPosition['y']);
                    break;

                // right
                case 39:
                    currentPosition['x'] = currentPosition['x'] + gridSize;
                    ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
                    console.log('right', currentPosition['x'], currentPosition['y']);
                    break;

                // down
                case 40:
                    currentPosition['y'] = currentPosition['y'] + gridSize;
                    ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
                    console.log('down', currentPosition['x'], currentPosition['y']);
                    break;

                default:
                    break;
            }
        }

    } else {
        // Canvas is not supported
        alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
    }
}

