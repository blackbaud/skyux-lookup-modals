import { expect, SkyHostBrowser, SkyVisualThemeSelector } from '@skyux-sdk/e2e';

import { browser, by, element, ExpectedConditions } from 'protractor';

describe('Lookup component', () => {
  let currentTheme: string;
  let currentThemeMode: string;

  async function selectTheme(theme: string, mode: string): Promise<void> {
    currentTheme = theme;
    currentThemeMode = mode;

    return SkyVisualThemeSelector.selectTheme(theme, mode);
  }

  function getScreenshotName(name: string): string {
    if (currentTheme) {
      name += '-' + currentTheme;
    }

    if (currentThemeMode) {
      name += '-' + currentThemeMode;
    }

    return name;
  }

  async function validateMultipleShowMoreModalScreenshot(
    done: DoneFn,
    screenshotName: string
  ): Promise<void> {
    const launcherButton = element(
      by.css('#show-more-modal-launcher-multiple')
    );
    await launcherButton.click();

    await browser.wait(
      ExpectedConditions.presenceOf(element(by.css('sky-modal'))),
      1200,
      'Show more modal took too long to appear.'
    );

    SkyHostBrowser.scrollTo('#show-more-modal-screenshot');
    expect('#show-more-modal-screenshot').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName(screenshotName)
    });
  }

  async function validateSingleModeShowMoreModalScreenshot(
    done: DoneFn,
    screenshotName: string
  ): Promise<void> {
    const launcherButton = element(by.css('#show-more-modal-launcher-single'));
    await launcherButton.click();

    await browser.wait(
      ExpectedConditions.presenceOf(element(by.css('sky-modal'))),
      1200,
      'Show more modal took too long to appear.'
    );

    SkyHostBrowser.scrollTo('#show-more-modal-screenshot');
    expect('#show-more-modal-screenshot').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName(screenshotName)
    });
  }

  function runTests(): void {
    describe('(lg screens)', () => {
      beforeEach(async () => {
        await SkyHostBrowser.setWindowBreakpoint('lg');
      });

      it('should match previous lookup multiple mode show more modal screenshot', async (done) => {
        validateMultipleShowMoreModalScreenshot(
          done,
          'lookup-multiple-mode-show-more'
        );
      });

      it('should match previous lookup single mode show more modal screenshot', async (done) => {
        validateSingleModeShowMoreModalScreenshot(
          done,
          'lookup-single-mode-show-more'
        );
      });
    });

    describe('(xs screens)', () => {
      beforeEach(() => {
        SkyHostBrowser.setWindowBreakpoint('xs');
      });

      it('should match previous lookup multiple mode show more modal screenshot', async (done) => {
        validateMultipleShowMoreModalScreenshot(
          done,
          'lookup-multiple-mode-show-more-xs'
        );
      });

      it('should match previous lookup single mode show more modal screenshot', async (done) => {
        validateSingleModeShowMoreModalScreenshot(
          done,
          'lookup-single-mode-show-more-xs'
        );
      });
    });
  }

  beforeEach(async () => {
    await SkyHostBrowser.get('visual/show-more-modal');
  });

  runTests();

  describe('when modern theme', () => {
    beforeEach(async () => {
      await selectTheme('modern', 'light');
    });

    runTests();
  });

  describe('when modern theme in dark mode', () => {
    beforeEach(async () => {
      await selectTheme('modern', 'dark');
    });

    runTests();
  });
});
