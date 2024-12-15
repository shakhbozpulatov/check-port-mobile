export function isWebView() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  // Common patterns for WebViews
  const webviewPattern =
    /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)|Android.*(wv|\.0\.0\.0)/i

  return webviewPattern.test(userAgent)
}
