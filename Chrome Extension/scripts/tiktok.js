(() => {
    /** CSS selectors in selectorArray to get rid of Tiktoks: 
     * 0: Recommended page only showing one post
     * 1: Removing loading symbol on recommended page 
     * 
     * Seems important to use \" instead of just " in the selectorArray below!
     */ 

    const selectorArray = [
        '[data-e2e=\"recommend-list-item-container\"]~[data-e2e=\"recommend-list-item-container\"]',
        'svg[class*=\"tiktok-qmnyxf-SvgContainer\"]'
    ];

    const stringifiedArray = (() => {
        let string = selectorArray[0];

        for(let i = 1; i < selectorArray.length; i++) {
            string += `,\n${selectorArray[i]}`;
        }

        return string;
    })();

    $('html').prepend(
        `<style>
        ${stringifiedArray} {
            display: none!important;
        }
        </style>`
    );
})();
