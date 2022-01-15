export function accessibleRouteChangeHandler() {
  return window.setTimeout(() => {
    const mainContainer = document.getElementById('primary-app-container');
    if (mainContainer) {
      mainContainer.focus();
    }
  }, 50);
}

export function dateToX(date, earliest) {
  let delta = date.getTime()-earliest.getTime();
  return delta/1440000;
}

export function xToDate(x, earliest) {
  return new Date(x*1440000+earliest.getTime());
}