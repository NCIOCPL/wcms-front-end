define(function(require) {

    var config = {

        breakpoints: {
            small: 480,
            medium: 640,
            large: 1024,
            xlarge: 1280,
            init: function () {
                // Create the #breakpoints element
                // read the content from it into the vars
                // Destroy the #breakpoints element
            }
        },

        lang: {
            Collapse: {
                en: 'Collapse',
                es: 'Reducir'
            },
            Expand: {
                en: 'Expand',
                es: 'Ampliar'
            },
            Section_Menu: {
                en: 'Section Menu',
                es: 'Menú de secciones'
            }

        }
    };

    return config;
});
