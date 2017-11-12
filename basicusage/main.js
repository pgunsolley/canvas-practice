(function() {
    /*
     * The canvas examples.
     */
    var context,
        examples = [
        // Example Canvas Drawings.
        // Pass the context in, and render the example.
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
     *
     * TODO: Reset the canvas before rendering example.
     */
    function createNextExampleButton(element, context) {
        var _button = document.createElement('button'),
            buttonText = 'Next Example',
            lastExample = -2,
            currentExample = -1;
        _button.innerHTML = buttonText;
        _button.onclick = function(e) {
            if (examples.length - 1 > currentExample && currentExample > lastExample) {
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
