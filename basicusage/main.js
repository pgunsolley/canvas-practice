(function() {
    /*
     * The canvas examples.
     */
    var context,
        // Example Canvas Drawings.
        // Pass the context in, and render the example.
        examples = [
            function drawExampleRectangles(ctx) {
                displayExampleTitle('Draw Standard Rect and Alpha Rect');
                // Draw rectangle using rgb color.
                ctx.fillStyle = 'rgb(200, 0, 0)';
                ctx.fillRect(10, 10, 50, 50);

                // Draw transparent rectangle using alpha rgb color (argb).
                ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
                ctx.fillRect(30, 30, 50, 50);
            },

            function drawAllRectTypes(ctx) {
                displayExampleTitle('Draw All Rect Types');

                // Draw a large black square, 100px on each side.
                ctx.fillRect(25, 25, 100, 100);

                // Erases a 60x60 square from the center.
                ctx.clearRect(45, 45, 60, 60);

                // Create a rectangular outline 50x50 pixels within the cleared square.
                ctx.strokeRect(50, 50, 50, 50);
            },

            function drawTriangleUsingPath(ctx) {
                displayExampleTitle('Draw A Triangle Using Paths.');

                // Initialize the path, but does not draw anything yet.
                ctx.beginPath();

                // "Moves the pen" to the beginning of the path.
                ctx.moveTo(75, 50);
                ctx.lineTo(100, 75);
                ctx.lineTo(100, 25);
                ctx.fill();
            },

            function drawSmilyFacePath(ctx) {
                displayExampleTitle('Draw A Smiley Face Using Paths.');

                ctx.beginPath();

                ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle.
                ctx.moveTo(110, 75);
                ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise).
                ctx.moveTo(65, 65);
                ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye.
                ctx.moveTo(95, 65);
                ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye.
                ctx.stroke();
            },

            function drawTrianglesWithLinePath(ctx) {
                displayExampleTitle('Draw 2 Triangles using Path LineTo.');

                // Filled triangle.
                ctx.beginPath();
                ctx.moveTo(25, 25);
                ctx.lineTo(105, 25);
                ctx.lineTo(25, 105);
                ctx.fill();

                // Stroked triangle.
                ctx.beginPath();
                ctx.moveTo(125, 125);
                ctx.lineTo(125, 45);
                ctx.lineTo(45, 125);
                ctx.closePath(); // Stroked shapes are not automatically closed.
                ctx.stroke();
            }
    ];

    /**
     * Check if the browser supports canvas and return
     * a canvas if it does, false if not.
     */
    function checkCanvasSupportContext() {
        var _canvas;
        _canvas = document.getElementById('tutorial');
        if (_canvas.getContext) {
            return _canvas.getContext('2d');
        }
        return false;
    }

    /**
     * Setup everything :O
     */
    function setup() {
        if (context = checkCanvasSupportContext()) {
            createNextExampleButton(document.getElementById('main'), context);
            displayExampleTitle('Blank Canvas');
        }
    }

    function reset() {
        context.clearRect(0, 0, 150, 150);
        displayExampleTitle('Blank Canvas');
    }

    function displayExampleTitle(title) {
        document.getElementById('example-title').innerHTML = title;
    }

    /**
     * The next button that scrolls through the examples.
     */
    function createNextExampleButton(element, context) {
        var _button = document.createElement('button'),
            buttonText = 'Next',
            lastExample = -2,
            currentExample = -1;
        _button.innerHTML = buttonText;
        _button.onclick = function(e) {
            if (examples.length - 1 > currentExample && currentExample > lastExample) {
                reset();
                currentExample++;
                examples[currentExample](context);
                lastExample = currentExample - 1;

                // Debug
                console.log('Current Example: ' + currentExample + '\n Last Example: ' + lastExample);
                //

                if (examples.length - 1 === currentExample) {
                    _button.innerHTML = 'Reset';
                }
            } else {
                // Reset everything.
                _button.innerHTML = buttonText;
                lastExample = -2;
                currentExample = -1;
                reset();
            }
        };
        element.appendChild(_button);
    }

    document.addEventListener('DOMContentLoaded', setup);
})();
