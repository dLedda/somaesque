function hslToRgb(hslStr: string): string {
    const opt = new Option();
    opt.style.color = hslStr;
    return opt.style.color;
}

function rgbToHex(rgbStr: string): string {
    const sep = rgbStr.indexOf(",") > -1 ? "," : " ";
    const rgb = rgbStr.substr(4).split(")")[0].split(sep);
    const r = (+rgb[0]).toString(16).padStart(2, "0");
    const g = (+rgb[1]).toString(16).padStart(2, "0");
    const b = (+rgb[2]).toString(16).padStart(2, "0");
    return "#" + r + g + b;
}

export function colorFromIndex(index: number): string {
    const colorWheelCycle = Math.floor(index / 6);
    const darknessCycle = Math.floor(index / 12);
    const spacing = (360 / 6);
    const offset = colorWheelCycle === 0 ? 0 : spacing / (colorWheelCycle + 2);
    let hue = spacing * (index % 6) + offset;
    const saturation = 100;
    const lightness = 1 / (2 + darknessCycle) * 100;
    return rgbToHex(hslToRgb(`hsl(${hue},${saturation}%,${Math.round(lightness)}%)`));
}