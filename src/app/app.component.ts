import {Component} from '@angular/core';

declare const tinycolor: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  primaryColor: string = '#bb0000';

  primaryColorPalette: Array<{name: string, hex: string, darkContrast: boolean}> = [];

  secondaryColor: string = '#0000aa';

  secondaryColorPalette: Array<{name: string, hex: string, darkContrast: boolean}> = [];


  constructor() {
    this.savePrimaryColor();
    this.saveSecondaryColor();
  }


  savePrimaryColor() {
    this.primaryColorPalette = computeColors(this.primaryColor);

    for (const color of this.primaryColorPalette) {
      const key1 = `--theme-primary-${color.name}`;
      const value1 = color.hex;
      // const key2 = `--theme-primary-contrast-${color.name}`;
      // const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      // console.log(key1, value1, key2, value2);
      document.documentElement.style.setProperty(key1, value1);
      // document.documentElement.style.setProperty(key2, value2);
    }
  }

  saveSecondaryColor() {
    this.secondaryColorPalette = computeColors(this.secondaryColor);

    for (const color of this.secondaryColorPalette) {
      const key1 = `--theme-secondary-${color.name}`;
      const value1 = color.hex;
      // const key2 = `--theme-secondary-contrast-${color.name}`;
      // const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      // document.documentElement.style.setProperty(key2, value2);
    }
  }

}

function computeColors(hex, algorithm = 'constantin') {
  // Return array of color objects.
  if (algorithm === 'constantin') {
    const baseLight = tinycolor('#ffffff');
    const baseDark = multiply(tinycolor(hex).toRgb(), tinycolor(hex).toRgb());
    const baseTriad = tinycolor(hex).tetrad();
    return [
      getColorObject(tinycolor.mix(baseLight, hex, 12), '50'),
      getColorObject(tinycolor.mix(baseLight, hex, 30), '100'),
      getColorObject(tinycolor.mix(baseLight, hex, 50), '200'),
      getColorObject(tinycolor.mix(baseLight, hex, 70), '300'),
      getColorObject(tinycolor.mix(baseLight, hex, 85), '400'),
      getColorObject(tinycolor.mix(baseLight, hex, 100), '500'),
      getColorObject(tinycolor.mix(baseDark, hex, 87), '600'),
      getColorObject(tinycolor.mix(baseDark, hex, 70), '700'),
      getColorObject(tinycolor.mix(baseDark, hex, 54), '800'),
      getColorObject(tinycolor.mix(baseDark, hex, 25), '900'),
      getColorObject(tinycolor.mix(baseDark, baseTriad[4], 15).saturate(80).lighten(65), 'A100'),
      getColorObject(tinycolor.mix(baseDark, baseTriad[4], 15).saturate(80).lighten(55), 'A200'),
      getColorObject(tinycolor.mix(baseDark, baseTriad[4], 15).saturate(100).lighten(45), 'A400'),
      getColorObject(tinycolor.mix(baseDark, baseTriad[4], 15).saturate(100).lighten(40), 'A700')
    ];
  } else {
    return [
      getColorObject(tinycolor(hex).lighten(52), '50'),
      getColorObject(tinycolor(hex).lighten(37), '100'),
      getColorObject(tinycolor(hex).lighten(26), '200'),
      getColorObject(tinycolor(hex).lighten(12), '300'),
      getColorObject(tinycolor(hex).lighten(6), '400'),
      getColorObject(tinycolor(hex), '500'),
      getColorObject(tinycolor(hex).darken(6), '600'),
      getColorObject(tinycolor(hex).darken(12), '700'),
      getColorObject(tinycolor(hex).darken(18), '800'),
      getColorObject(tinycolor(hex).darken(24), '900'),
      getColorObject(tinycolor(hex).lighten(50).saturate(30), 'A100'),
      getColorObject(tinycolor(hex).lighten(30).saturate(30), 'A200'),
      getColorObject(tinycolor(hex).lighten(10).saturate(15), 'A400'),
      getColorObject(tinycolor(hex).lighten(5).saturate(5), 'A700')
    ];
  }
}

function multiply(rgb1, rgb2) {
  rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
  rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
  rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);
  return tinycolor('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
}

function getColorObject(value, name) {
  const c = tinycolor(value);
  return {
    name: name,
    hex: c.toHexString(),
    darkContrast: c.isLight()
  };
}
