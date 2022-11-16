import userAgent from "user-agents";
import puppeteer from "puppeteer-extra";
import { executablePath } from "puppeteer";

import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";

puppeteer.use(StealthPlugin()).use(AdblockerPlugin({ blockTrackers: true }));

const minimal_args = [
  "--autoplay-policy=user-gesture-required",
  "--disable-background-networking",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-breakpad",
  "--disable-client-side-phishing-detection",
  "--disable-component-update",
  "--disable-default-apps",
  "--disable-dev-shm-usage",
  "--disable-domain-reliability",
  "--disable-extensions",
  "--disable-features=AudioServiceOutOfProcess",
  "--disable-hang-monitor",
  "--disable-ipc-flooding-protection",
  "--disable-notifications",
  "--disable-offer-store-unmasked-wallet-cards",
  "--disable-popup-blocking",
  "--disable-print-preview",
  "--disable-prompt-on-repost",
  "--disable-renderer-backgrounding",
  "--disable-setuid-sandbox",
  "--disable-speech-api",
  "--disable-sync",
  "--hide-scrollbars",
  "--ignore-gpu-blacklist",
  "--metrics-recording-only",
  "--mute-audio",
  "--no-default-browser-check",
  "--no-first-run",
  "--no-pings",
  "--no-sandbox",
  "--no-zygote",
  "--password-store=basic",
  "--use-gl=swiftshader",
  "--use-mock-keychain",
];

const blocked_domains = [
  "googlesyndication.com",
  "adservice.google.com",
  "googleads.g.doubleclick.net",
  "googlesyndication.com",
  "googleadservices.com",
  "google-analytics.com",
  "googletagmanager.com",
  "google.com",
  "jsd-widget.atlassian.com",
  "cloudflareinsights.com",
  "googletagmanager",
  "cloudfront.net",
  "amazon-adsystem.com",
  "districtm.io",
  "adnxs.com",
  "amplitude.com",
  "diffuser-cdn.app-us1.com",
  "impactcdn.com",
  "cloudflare.com",
  "trustpilot.com",
  "quantcast.com",
  "quantserve.com",
  "quantcast.mgr.consensu.org",
  "stocktwits.com/addon/widget",
  // add more here after seeing what requests are being made
];

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/ResourceType
const blocked_resources = [
  "beacon",
  "font",
  "stylesheet",
  "csp_report",
  "ping",
  // "imageset",
  // "image",
  // "media",
];

export const usePuppeteer = async (testing = false) => {
  const browser = await puppeteer.launch({
    headless: !testing,
    args: [...minimal_args, "--proxy-server=https://8.242.172.174:8080"],
    defaultViewport: testing ? undefined : { width: 1920, height: 1080 },
    executablePath: executablePath(),
  });

  let [page] = await browser.pages();

  !testing &&
    (await page.setViewport({
      width: 1920 + Math.floor(Math.random() * 100),
      height: 3000 + Math.floor(Math.random() * 100),
      deviceScaleFactor: 1,
      hasTouch: false,
      isLandscape: false,
      isMobile: false,
    }));

  await page.setUserAgent(userAgent.toString());

  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = request.url();
    const resourceType = request.resourceType();

    if (
      (blocked_domains.some((domain) => url.includes(domain)) ||
        blocked_resources.includes(resourceType)) &&
      !testing
    )
      request.abort();
    else request.continue();
  });

  return { page, browser };
};
