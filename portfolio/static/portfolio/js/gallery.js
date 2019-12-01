document.addEventListener('DOMContentLoaded', function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
        gallery = new Gallery();
    }

    var images = document.querySelectorAll('[data-src]');
    window.addEventListener('scroll', function (e) {
        loadImageData(images);
    }, false);
    window.addEventListener('load', function () {
        setTimeout(function () {
            loadImageData(images);
        }, 50);
    });
});


var isInViewport = function (el) {
    var bounding = el.getBoundingClientRect();
    return (
        bounding.bottom >= 0 &&
        bounding.right >= 0 &&
        bounding.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
};


var loadImageData = function (images) {
    images.forEach(function (img) {
        if (img.getAttribute('loaded') != 'true' && isInViewport(img)) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.setAttribute('loaded', 'true');
            img.addEventListener('load', function () {
                // Remove blur only once image finished loading
                img.classList.remove('blur');
            });
        }
    });
};


let Gallery = class {
    constructor(
            galleryId = 'gallery',
            thumbSelector = '#gallery .thumb',
            rowSelector = '#gallery .row') {
        this.gallery = document.getElementById(galleryId);
        this.thumbs = document.querySelectorAll(thumbSelector);
        this.rows = document.querySelectorAll(rowSelector);

        this.draw();
    }

    draw() {
        let me = this;
        let rows_widths = [0, 0];
        
        me.thumbs.forEach(function (thumb) {
            let img = thumb.querySelector('img');
            
            // Hide thumb before it is loaded
            thumb.style.display = 'none';
            img.style.width = 'initial';

            img.addEventListener('load', function () {
                if (img.getAttribute('width_computed') != 'true'){
                    // Reveal image after it is loaded for width calculations
                    thumb.style.display = 'initial';
                    
                    if (rows_widths[0] <= rows_widths[1]) {
                        me.rows[0].appendChild(thumb);
                        rows_widths[0] += thumb.offsetWidth;
                    } else {
                        me.rows[1].appendChild(thumb);
                        rows_widths[1] += thumb.offsetWidth;
                    }

                    // Set attrib so the image src can be changed without triggering width computation again
                    img.setAttribute('width_computed', 'true');
                    
                    // Apply styles modifying size after width calculations
                    thumb.style.flexGrow = '1';
                    img.style.width = '100%';
                    me.gallery.style.width = Math.max(...rows_widths) + 'px';
                }
            });
        });
    }
  };
  