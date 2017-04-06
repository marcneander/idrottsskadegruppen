require("babel-polyfill");
const contentful = require('contentful');
const marked = require('marked');

(($) => {

    const appendPersoner = (entry) => {
        let person = `
        <div class="card mb-4">
            <div class="card-img-top text-center">
                <img class="img-fluid" src="${entry.fields.bild.fields.file.url}" alt="${entry.fields.namn}">
            </div>
            <div class="card-block">
                <h4 class="card-title">${entry.fields.namn}</h4>
                <p>Ring: <a href="tel:${entry.fields.telefon}">${entry.fields.telefon}</a></p>
                <div class="person-text">${marked(entry.fields.text)}</div>
                ${entry.fields.bokaUrl ? `<a href="${entry.fields.bokaUrl}" target="_blank" class="btn btn-primary btn-block">Boka</a>` : ''}
            </div>
        </div>
        `;

        $(person).appendTo('.js-personer');
    };

    const appendTexter = (entry) => {
        let text = `
            <h1>${entry.fields.huvudrubrik}</h1>
            ${marked(entry.fields.introtext)}

            <div id="meny1" class="mt-5">
                <h3>${entry.fields.rubrik1}</h3>
                ${marked(entry.fields.text1)}
            </div>

            <div id="meny2" class="mt-5">
                <h3>${entry.fields.rubrik2}</h3>
                ${marked(entry.fields.text2)}
            </div>

            <div id="meny3" class="mt-5">
                <h3>${entry.fields.rubrik3}</h3>
                ${marked(entry.fields.text3)}
            </div>

            <div id="meny4" class="mt-5">
                <h3>${entry.fields.rubrik4}</h3>
                ${marked(entry.fields.adressText)}
                <iframe
                    style="width: 100%; height: 400px;"
                    frameborder="0" style="border:0"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyATxU_CtB6M3fVLfRLoy0q8qy0NAVFjCQk&q=${entry.fields.adressSkGooglemaps}" allowfullscreen>
                </iframe>
            </div>
        `;

        $(text).appendTo('.js-texter')
    };

    const appendMenu = (entry) => {
        let menu = '';

        Object.keys(entry.fields).forEach((key) => {
            if (key.includes('meny')) {
                menu += `
                <li class="nav-item active">
                    <a class="nav-link js-menu-item" href="#${key}">${entry.fields[key]}</a>
                </li>
                `;
            }
        });

        $(menu).prependTo('.js-menu');
    };


    $(() => {
        const client = contentful.createClient({
            space: 'rs46ftjpdzy2',
            accessToken: '978dde85f4fe077ce048b645c17fc5967b2ed83db35025a8202e3d3d8891bb4a'
        });

        client.getEntries({order: 'sys.createdAt'}).then((entries) => {
            entries.items.forEach((entry) => {
                if (entry.sys.contentType.sys.id === 'personer') {
                    appendPersoner(entry);
                } else {
                    appendTexter(entry);
                    appendMenu(entry);
                }
            });
        });

        $(document).on('click', '.js-menu-item', function(event) {
            event.preventDefault();
            $('html, body').animate({scrollTop: $(this.hash).offset().top - 70}, 500);
        });
});
})(jQuery);
