import {Component} from '@angular/core';

declare const tinycolor: any;

export interface Color {
  name: string;
  hex: string;
  darkContrast: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  primaryColor = '#bb0000';

  primaryColorPalette: Color[] = [];

  secondaryColor = '#0000aa';

  secondaryColorPalette: Color[] = [];


  constructor() {
    this.savePrimaryColor();
    this.saveSecondaryColor();
  }


  savePrimaryColor() {
    this.primaryColorPalette = computeColors(this.primaryColor);

    for (const color of this.primaryColorPalette) {
      const key = `--theme-primary-${color.name}`;
      const value = color.hex;
      document.documentElement.style.setProperty(key, value);
    }
  }

  saveSecondaryColor() {
    this.secondaryColorPalette = computeColors(this.secondaryColor);

    for (const color of this.secondaryColorPalette) {
      const key = `--theme-secondary-${color.name}`;
      const value = color.hex;
      document.documentElement.style.setProperty(key, value);
    }
  }

}

function computeColors(hex: string): Color[] {
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

function getColorObject(value, name): Color {
  const c = tinycolor(value);
  return {
    name: name,
    hex: c.toHexString(),
    darkContrast: c.isLight()
  };
}
