export const newWindow = (url = '', customOptions = {}) => {
    // Type checking to avoid problems with null being passed accidentally
    customOptions = customOptions !== null ? customOptions : {};

    const height = customOptions.height || 400;
    const width = customOptions.width || 500;
    const left = (window.outerWidth / 2) + (window.screenX || window.screenLeft || 0) - (width / 2);
    const top = (window.outerHeight / 2) + (window.screenY || window.screenTop || 0) - (height / 2);

    const defaultOptions = {
        left,
        top,
        height,
        width,
        toolbar: 'no',
        status: 'no',
        directories: 'no',
        menubar: 'no',
        scrollbars: 'yes',
        resizable: 'no',
        centerscreen: 'yes',
        chrome: 'yes',        
    };

    const options = Object.assign({}, defaultOptions, customOptions)
    const optionsString = Object.entries(options)
                                .map(([feature, setting]) => `${feature}=${setting}`)
                                .join(', ');

    const openWindow = window.open(url, '', optionsString)

    return openWindow;

    // TODO: Add in support for custom callback on window close (listen for window's existence with interval
    // and trigger on it disappearing and clear interval OR use unload event)
      
};