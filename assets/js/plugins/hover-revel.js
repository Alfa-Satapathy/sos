/**
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 */
{
    const mapNumber = (X,A,B,C,D) => (X-A)*(D-C)/(B-A)+C;
    // from http://www.quirksmode.org/js/events_properties.html#position
	const getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
		if (!e) e = window.event;
		if (e.pageX || e.pageY) {
            posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
        return { x : posx, y : posy }
    }
    // Generate a random float.
    const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

    // Custom hover effect implementation
    class CustomHoverEffect {
        constructor(element) {
            this.element = element;
            this.hoverWrapper = document.createElement('div');
            this.hoverWrapper.className = 'custom-hover-wrapper';
            this.hoverWrapper.innerHTML = `
                <div class="custom-hover-inner">
                    <div class="custom-hover-img" style="background-image: url(${element.dataset.img || ''})">
                        <div class="custom-hover-content">
                            <h3>${element.dataset.title || ''}</h3>
                            <span>${element.dataset.subtitle || ''}</span>
                            <p>${element.dataset.desc || ''}</p>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(this.hoverWrapper);

            this.initEvents();
        }

        initEvents() {
            this.element.addEventListener('mouseenter', (e) => this.showHover(e));
            this.element.addEventListener('mousemove', (e) => this.moveHover(e));
            this.element.addEventListener('mouseleave', () => this.hideHover());
        }

        showHover(event) {
            this.hoverWrapper.style.opacity = '1';
            this.moveHover(event);
        }

        moveHover(event) {
            const { clientX: x, clientY: y } = event;
            this.hoverWrapper.style.transform = `translate(${x + 20}px, ${y + 20}px)`;
        }

        hideHover() {
            this.hoverWrapper.style.opacity = '0';
        }
    }

    // Initialize hover effects for elements with the `data-hover` attribute
    document.querySelectorAll('[data-hover]').forEach(el => new CustomHoverEffect(el));

    const contentel = document.querySelector('.content');
    [...document.querySelectorAll('.block__title, .block__link, .content__text-link')].forEach((el) => {
        const imgsArr = el.dataset.img.split(',');
        const imgsSubtitle = el.dataset.subtitle.split(',');
        const imgsTitle = el.dataset.title.split(',');
        const imgsDesc = el.dataset.desc.split(',');
        const metaDate = el.dataset.metaDate.split(',');
        const metaDateLink = el.dataset.metaDateLink.split(',');
        const metaAuthor = el.dataset.metaAuthor.split(',');
        const metaAuthorLink = el.dataset.metaAuthorLink.split(',');
        const metaTag = el.dataset.metaTag.split(',');
        const metaTagLink = el.dataset.metaTagLink.split(',');
        for (let i = 0, len = imgsArr.length; i <= len-1; ++i ) {
            const imgel = document.createElement('img');
            imgel.style.visibility = 'hidden';
            imgel.style.width = 0;
            imgel.src = imgsArr[i];
            imgel.className = 'preload';
            contentel.appendChild(imgel);
        }
    });
}