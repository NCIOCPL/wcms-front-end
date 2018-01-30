const overviewSettings = {
    str: '',
    options: {
        color: '#543ecd',
        generator: 'concentricCircles'
    }
};

const settings = {
    ".cthp-overview-title": overviewSettings,
    ".cthp-overview h3": overviewSettings,
    ".cthp-treatment h3": {
        str: '',
        options: {
            color: '#00c088',
            generator: 'sineWaves'
        }
    },
    ".cthp-research h3": {
        str: '',
        options: {
            color: '#1e7dc5',
            generator: 'tessellation'
        }
    },
    ".cthp-causes h3": {
        str: '',
        options: {
            color: '#8127a9',
            generator: 'nestedSquares'
        }
    },
    ".cthp-genetics h3": 'NONE',
    ".cthp-screening h3": {
        str: '',
        options: {
            color: '#c6395a',
            generator: 'triangles'
        }
    },
    ".cthp-survival h3": {
        str: '',
        options: {
            color: '#d6891a',
            generator: 'squares'
        }
    },
    ".cthp-general h3": {
        str: '',
        options: {
            color: '#119bb5',
            generator: 'octogons' // The library maker mispelled it in the source :p
        }
    },
    ".cthp-pink-feature h3": {
        str: '',
        options: {
            color: '#ce2daf',
            generator: 'mosaicSquares'
        }
    },
    ".cthp-yellow-feature h3": {
        str: '',
        options: {
            color: '#dbc416',
            generator: 'hexagons'
        }
    },
};

export default settings;