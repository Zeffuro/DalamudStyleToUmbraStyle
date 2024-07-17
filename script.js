function decodeGzipBase64(encodedString) {
    const trimmedText = encodedString.slice(3); // Remove the first three characters
    const bytesData = Uint8Array.from(atob(trimmedText), c => c.charCodeAt(0));
    const decompressedData = pako.ungzip(bytesData);
    return new TextDecoder().decode(decompressedData);
}

function encodeDeflateBase64(jsonString) {
    const bytesData = new TextEncoder().encode(jsonString);
    const compressedData = pako.deflate(bytesData).subarray(2, -4);
    return btoa(String.fromCharCode(...compressedData));
}

function rgbaToInt(b, g, r, a) {
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    a = Math.round(a * 255);
    return ((a << 24) + (r << 16) + (g << 8) + b) >>> 0;
}

function intToRgba(int) {
    const a = ((int >> 24) & 255) / 255;
    const r = ((int >> 16) & 255) / 255;
    const g = ((int >> 8) & 255) / 255;
    const b = (int & 255) / 255;
    return `rgba(${b * 255}, ${g * 255}, ${r * 255}, ${a})`;
}

function updateStyle2Json() {
    const style2Json = JSON.stringify(style2Converted, null, 4);
    document.getElementById('style2').value = style2Json;
    const encodedString = encodeDeflateBase64(style2Json);
    document.getElementById('encodedOutput').value = encodedString;
}

document.getElementById('decodeBtn').addEventListener('click', function() {
    const encodedString = document.getElementById('encodedInput').value;
    try {
        const jsonString = decodeGzipBase64(encodedString);
        document.getElementById('style1').value = jsonString;
    } catch (e) {
        alert('Invalid encoded string');
        console.error(e);
    }
});

let style2Converted = {};

document.getElementById('convertBtn').addEventListener('click', function() {
    const style1Json = document.getElementById('style1').value;
    let style1;
    try {
        style1 = JSON.parse(style1Json);
    } catch (e) {
        alert('Invalid JSON');
        return;
    }
    
    style2Converted = convertColors(style1);
    updateStyle2Json();
    createColorPickers();
});

function convertColors(style1) {
    const col = style1.col;
    const converted = {};

    converted.Black = {
        "Window.Background": rgbaToInt(col.WindowBg.X, col.WindowBg.Y, col.WindowBg.Z, col.WindowBg.W),
        "Window.BackgroundLight": rgbaToInt(col.ChildBg.X, col.ChildBg.Y, col.ChildBg.Z, col.ChildBg.W),
        "Window.Border": rgbaToInt(col.Border.X, col.Border.Y, col.Border.Z, col.Border.W),
        "Window.TitlebarBackground": rgbaToInt(col.TitleBg.X, col.TitleBg.Y, col.TitleBg.Z, col.TitleBg.W),
        "Window.TitlebarBorder": rgbaToInt(col.TitleBgActive.X, col.TitleBgActive.Y, col.TitleBgActive.Z, col.TitleBgActive.W),
        "Window.TitlebarGradient1": rgbaToInt(col.TitleBgCollapsed.X, col.TitleBgCollapsed.Y, col.TitleBgCollapsed.Z, col.TitleBgCollapsed.W),
        "Window.TitlebarGradient2": rgbaToInt(col.MenuBarBg.X, col.MenuBarBg.Y, col.MenuBarBg.Z, col.MenuBarBg.W),
        "Window.TitlebarText": rgbaToInt(col.Text.X, col.Text.Y, col.Text.Z, col.Text.W),
        "Window.TitlebarTextOutline": rgbaToInt(col.TextDisabled.X, col.TextDisabled.Y, col.TextDisabled.Z, col.TextDisabled.W),
        "Window.TitlebarCloseButton": rgbaToInt(col.PopupBg.X, col.PopupBg.Y, col.PopupBg.Z, col.PopupBg.W),
        "Window.TitlebarCloseButtonBorder": rgbaToInt(col.BorderShadow.X, col.BorderShadow.Y, col.BorderShadow.Z, col.BorderShadow.W),
        "Window.TitlebarCloseButtonHover": rgbaToInt(col.FrameBgHovered.X, col.FrameBgHovered.Y, col.FrameBgHovered.Z, col.FrameBgHovered.W),
        "Window.TitlebarCloseButtonX": rgbaToInt(col.FrameBgActive.X, col.FrameBgActive.Y, col.FrameBgActive.Z, col.FrameBgActive.W),
        "Window.TitlebarCloseButtonXHover": rgbaToInt(col.TitleBgActive.X, col.TitleBgActive.Y, col.TitleBgActive.Z, col.TitleBgActive.W),
        "Window.TitlebarCloseButtonXOutline": rgbaToInt(col.TitleBg.X, col.TitleBg.Y, col.TitleBg.Z, col.TitleBg.W),
        "Window.ScrollbarTrack": rgbaToInt(col.ScrollbarBg.X, col.ScrollbarBg.Y, col.ScrollbarBg.Z, col.ScrollbarBg.W),
        "Window.ScrollbarThumb": rgbaToInt(col.ScrollbarGrab.X, col.ScrollbarGrab.Y, col.ScrollbarGrab.Z, col.ScrollbarGrab.W),
        "Window.ScrollbarThumbHover": rgbaToInt(col.ScrollbarGrabHovered.X, col.ScrollbarGrabHovered.Y, col.ScrollbarGrabHovered.Z, col.ScrollbarGrabHovered.W),
        "Window.ScrollbarThumbActive": rgbaToInt(col.ScrollbarGrabActive.X, col.ScrollbarGrabActive.Y, col.ScrollbarGrabActive.Z, col.ScrollbarGrabActive.W),
        "Window.Text": rgbaToInt(col.Text.X, col.Text.Y, col.Text.Z, col.Text.W),
        "Window.TextLight": rgbaToInt(col.TextSelectedBg.X, col.TextSelectedBg.Y, col.TextSelectedBg.Z, col.TextSelectedBg.W),
        "Window.TextMuted": rgbaToInt(col.TextDisabled.X, col.TextDisabled.Y, col.TextDisabled.Z, col.TextDisabled.W),
        "Window.TextOutline": rgbaToInt(col.TextSelectedBg.X, col.TextSelectedBg.Y, col.TextSelectedBg.Z, col.TextSelectedBg.W),
        "Window.TextDisabled": rgbaToInt(col.TextDisabled.X, col.TextDisabled.Y, col.TextDisabled.Z, col.TextDisabled.W),
        "Window.AccentColor": rgbaToInt(col.CheckMark.X, col.CheckMark.Y, col.CheckMark.Z, col.CheckMark.W),
        "Input.Background": rgbaToInt(col.FrameBg.X, col.FrameBg.Y, col.FrameBg.Z, col.FrameBg.W),
        "Input.Border": rgbaToInt(col.Border.X, col.Border.Y, col.Border.Z, col.Border.W),
        "Input.Text": rgbaToInt(col.Text.X, col.Text.Y, col.Text.Z, col.Text.W),
        "Input.TextMuted": rgbaToInt(col.TextDisabled.X, col.TextDisabled.Y, col.TextDisabled.Z, col.TextDisabled.W),
        "Input.TextOutline": rgbaToInt(col.TextSelectedBg.X, col.TextSelectedBg.Y, col.TextSelectedBg.Z, col.TextSelectedBg.W),
        "Input.BackgroundHover": rgbaToInt(col.FrameBgHovered.X, col.FrameBgHovered.Y, col.FrameBgHovered.Z, col.FrameBgHovered.W),
        "Input.BorderHover": rgbaToInt(col.BorderShadow.X, col.BorderShadow.Y, col.BorderShadow.Z, col.BorderShadow.W),
        "Input.TextHover": rgbaToInt(col.TextSelectedBg.X, col.TextSelectedBg.Y, col.TextSelectedBg.Z, col.TextSelectedBg.W),
        "Input.TextOutlineHover": rgbaToInt(col.TextSelectedBg.X, col.TextSelectedBg.Y, col.TextSelectedBg.Z, col.TextSelectedBg.W),
        "Input.BackgroundDisabled": rgbaToInt(col.TextDisabled.X, col.TextDisabled.Y, col.TextDisabled.Z, col.TextDisabled.W),
        "Input.BorderDisabled": rgbaToInt(col.TextDisabled.X, col.TextDisabled.Y, col.TextDisabled.Z, col.TextDisabled.W),
        "Input.TextDisabled": rgbaToInt(col.TextDisabled.X, col.TextDisabled.Y, col.TextDisabled.Z, col.TextDisabled.W),
        "Input.TextOutlineDisabled": rgbaToInt(col.TextSelectedBg.X, col.TextSelectedBg.Y, col.TextSelectedBg.Z, col.TextSelectedBg.W),
        "Toolbar.InactiveBackground1": rgbaToInt(col.DockingEmptyBg.X, col.DockingEmptyBg.Y, col.DockingEmptyBg.Z, col.DockingEmptyBg.W),
        "Toolbar.InactiveBackground2": rgbaToInt(col.DockingEmptyBg.X, col.DockingEmptyBg.Y, col.DockingEmptyBg.Z, col.DockingEmptyBg.W),
        "Toolbar.Background1": rgbaToInt(col.TitleBg.X, col.TitleBg.Y, col.TitleBg.Z, col.TitleBg.W),
        "Toolbar.Background2": rgbaToInt(col.TitleBg.X, col.TitleBg.Y, col.TitleBg.Z, col.TitleBg.W),
        "Toolbar.InactiveBorder": rgbaToInt(col.BorderShadow.X, col.BorderShadow.Y, col.BorderShadow.Z, col.BorderShadow.W),
        "Toolbar.Border": rgbaToInt(col.Border.X, col.Border.Y, col.Border.Z, col.Border.W),
        "Widget.Background": rgbaToInt(col.FrameBg.X, col.FrameBg.Y, col.FrameBg.Z, col.FrameBg.W),
        "Widget.BackgroundDisabled": rgbaToInt(col.TextDisabled.X, col.TextDisabled.Y, col.TextDisabled.Z, col.TextDisabled.W),
        "Widget.BackgroundHover": rgbaToInt(col.FrameBgHovered.X, col.FrameBgHovered.Y, col.FrameBgHovered.Z, col.FrameBgHovered.W),
        "Widget.Border": rgbaToInt(col.Border.X, col.Border.Y, col.Border.Z, col.Border.W),
        "Widget.BorderDisabled": rgbaToInt(col.TextDisabled.X, col.TextDisabled.Y, col.TextDisabled.Z, col.TextDisabled.W),
        "Widget.BorderHover": rgbaToInt(col.BorderShadow.X, col.BorderShadow.Y, col.BorderShadow.Z, col.BorderShadow.W),
        "Widget.Text": rgbaToInt(col.Text.X, col.Text.Y, col.Text.Z, col.Text.W),
        "Widget.TextDisabled": rgbaToInt(col.TextDisabled.X, col.TextDisabled.Y, col.TextDisabled.Z, col.TextDisabled.W),
        "Widget.TextHover": rgbaToInt(col.TextSelectedBg.X, col.TextSelectedBg.Y, col.TextSelectedBg.Z, col.TextSelectedBg.W),
        "Widget.TextMuted": rgbaToInt(col.TextDisabled.X, col.TextDisabled.Y, col.TextDisabled.Z, col.TextDisabled.W),
        "Widget.TextOutline": rgbaToInt(col.TextSelectedBg.X, col.TextSelectedBg.Y, col.TextSelectedBg.Z, col.TextSelectedBg.W),
        "Widget.PopupBackground": rgbaToInt(col.PopupBg.X, col.PopupBg.Y, col.PopupBg.Z, col.PopupBg.W),
        "Widget.PopupBackground.Gradient1": rgbaToInt(col.PopupBg.X, col.PopupBg.Y, col.PopupBg.Z, col.PopupBg.W),
        "Widget.PopupBackground.Gradient2": rgbaToInt(col.PopupBg.X, col.PopupBg.Y, col.PopupBg.Z, col.PopupBg.W),
        "Widget.PopupBorder": rgbaToInt(col.Border.X, col.Border.Y, col.Border.Z, col.Border.W),
        "Widget.PopupMenuText": rgbaToInt(col.Text.X, col.Text.Y, col.Text.Z, col.Text.W),
        "Widget.PopupMenuTextMuted": rgbaToInt(col.TextDisabled.X, col.TextDisabled.Y, col.TextDisabled.Z, col.TextDisabled.W),
        "Widget.PopupMenuTextDisabled": rgbaToInt(col.TextDisabled.X, col.TextDisabled.Y, col.TextDisabled.Z, col.TextDisabled.W),
        "Widget.PopupMenuTextHover": rgbaToInt(col.TextSelectedBg.X, col.TextSelectedBg.Y, col.TextSelectedBg.Z, col.TextSelectedBg.W),
        "Widget.PopupMenuBackgroundHover": rgbaToInt(col.PopupBg.X, col.PopupBg.Y, col.PopupBg.Z, col.PopupBg.W),
        "Widget.PopupMenuTextOutline": rgbaToInt(col.TextSelectedBg.X, col.TextSelectedBg.Y, col.TextSelectedBg.Z, col.TextSelectedBg.W),
        "Widget.PopupMenuTextOutlineHover": rgbaToInt(col.TextSelectedBg.X, col.TextSelectedBg.Y, col.TextSelectedBg.Z, col.TextSelectedBg.W),
        "Widget.PopupMenuTextOutlineDisabled": rgbaToInt(col.TextDisabled.X, col.TextDisabled.Y, col.TextDisabled.Z, col.TextDisabled.W),
    };

    return converted;
}

function createColorPickers() {
    const container = document.getElementById('colorPickers');
    container.innerHTML = '';
    for (const [key, value] of Object.entries(style2Converted.Black)) {
        const rgbaColor = value ? intToRgba(value) : 'rgba(0, 0, 0, 0)';

        // Create a container for the color picker
        const pickerContainer = document.createElement('div');
        pickerContainer.className = 'color-picker-container';

        // Create a button to trigger the color picker
        const colorPickerButton = document.createElement('button');
        colorPickerButton.className = 'color-picker-button';
        colorPickerButton.dataset.key = key;
        pickerContainer.appendChild(colorPickerButton);

        // Create a label for the color picker
        const labelContainer = document.createElement('div');
        labelContainer.className = 'label-color-picker';
        const label = document.createElement('label');
        label.textContent = key;
        labelContainer.appendChild(label);
        labelContainer.appendChild(pickerContainer);
        container.appendChild(labelContainer);

        // Initialize Pickr for this color picker
        const pickr = Pickr.create({
            el: colorPickerButton,
            theme: 'classic', // or 'monolith', or 'nano'
            default: rgbaColor,
            comparison: false,
            components: {
                // Main components
                preview: true,
                opacity: true, 
                hue: true,

                // Input / output Options
                interaction: { 
                    hex: true,
                    rgba: true,
                    hsla: false,
                    hsva: false,
                    cmyk: false,
                    input: true,
                    clear: false,
                    save: true
                }
            }
        });

        // Update the color value when the user selects a new color
        pickr.on('save', (color) => {
            const rgba = color.toRGBA();
            style2Converted.Black[key] = rgbaToInt(rgba[2], rgba[1], rgba[0], rgba[3]);
            console.log(rgba, rgbaToInt(rgba[2], rgba[1], rgba[0], rgba[3]));
            updateStyle2Json();
        });

        // Update the color value when the user selects a new color
        pickr.on('change', (color) => {
            const rgba = color.toRGBA();
            style2Converted.Black[key] = rgbaToInt(rgba[2], rgba[1], rgba[0], rgba[3]);
            updateStyle2Json();
        });
    }
}

function rgbaColorToHex(rgba) {
    const rgb = rgba.match(/\d+/g).slice(0, 3).map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
    return `#${rgb}`;
}

function hexToRgbaInt(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;
    return rgbaToInt(r, g, b, 1);
}

// Copy button functionality
document.getElementById('copyBtn').addEventListener('click', function() {
    const encodedOutput = document.getElementById('encodedOutput');
    encodedOutput.select();
    encodedOutput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    alert('Copied to clipboard');
});
