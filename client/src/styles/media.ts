export const PHONE = 322;
export const PHONE_LANDSCAPE = 576;
export const TABLET = 768;
export const TABLET_LANDSCAPE = 992;
export const DESKTOP = 1200;
export const LARGE_DESKTOP = 1440;

export const isPhone = (width: number): boolean => width < PHONE_LANDSCAPE;
export const isPhoneLandscape = (width: number): boolean => width < TABLET;
export const isTablet = (width: number): boolean => width < TABLET_LANDSCAPE;
export const isTabletLandscape = (width: number): boolean => width < DESKTOP;
export const isDesktop = (width: number): boolean => width < LARGE_DESKTOP;
export const isLargeDesktop = (width: number): boolean =>
  width >= LARGE_DESKTOP;

const createMediaQueryCSS = (content: string, breakpoint: number) => `
  @media (min-width: ${breakpoint}px) {
    ${content}
  }
`;

export const mediaBreakpointPhone = (content: string) => {
  return createMediaQueryCSS(content, PHONE);
};

export const mediaBreakpointLandscapePhone = (content: string) => {
  return createMediaQueryCSS(content, PHONE_LANDSCAPE);
};

export const mediaBreakpointTablet = (content: string) => {
  return createMediaQueryCSS(content, TABLET);
};

export const mediaBreakpointLandscapeTablet = (content: string) => {
  return createMediaQueryCSS(content, TABLET_LANDSCAPE);
};

export const mediaBreakpointDesktop = (content: string) => {
  return createMediaQueryCSS(content, DESKTOP);
};

export const mediaBreakpointLargeDesktop = (content: string) => {
  return createMediaQueryCSS(content, LARGE_DESKTOP);
};
