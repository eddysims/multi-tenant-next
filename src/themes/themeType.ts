export type ThemeType = {
  name: string;
  selectors: string[];
  theme: Theme;
}

type Theme = {
  colors: {
    primary: string;
  }
}