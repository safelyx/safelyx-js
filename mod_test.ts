import 'jsr:@std/dotenv@0.225.3/load';
import { assertEquals } from 'jsr:@std/assert@1.0.8';

import {
  checkEmail,
  checkImage,
  checkLink,
  checkMessage,
  type SafeEmailResponse,
  type SafeImageResponse,
  type SafeLinkResponse,
  type SafeMessageResponse,
} from './mod.ts';

const TEST_KEY_CODE = Deno.env.get('TEST_KEY_CODE');

Deno.test('that .checkLink() works', async () => {
  const tests: { url: string; expected: SafeLinkResponse }[] = [
    {
      url: 'example.com',
      expected: {
        url: 'https://example.com',
        result: 8,
        result_text: 'This link looks safe.',
        date: '2025-01-01',
        analysis: {
          domain_reputation: "This domain wasn't found in any malicious lists.",
          source_code: 'This website appears to have only basic HTML.',
          anti_virus: 'N/A',
        },
        checks_remaining: 1000,
      },
    },
  ];

  for (const test of tests) {
    const parsedUrl = await checkLink(test.url, TEST_KEY_CODE);
    assertEquals(parsedUrl.url, test.expected.url);
    assertEquals(parsedUrl.result >= 8 && parsedUrl.result <= 10, true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedUrl, 'result_text'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedUrl, 'date'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedUrl, 'analysis'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedUrl.analysis, 'domain_reputation'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedUrl.analysis, 'source_code'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedUrl.analysis, 'anti_virus'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedUrl, 'checks_remaining'), true);
  }
});

Deno.test('that .checkEmail() works', async () => {
  const tests: { email: string; expected: SafeEmailResponse }[] = [
    {
      email: 'help@safelyx.com',
      expected: {
        email: 'help@safelyx.com',
        result: 8,
        result_text: 'This email looks legitimate.',
        date: '2025-01-01',
        analysis: {
          address: 'This email address is valid.',
          domain_reputation: "This domain isn't found in any malicious lists.",
          mx_records: 'This domain has valid MX records.',
        },
        checks_remaining: 1000,
      },
    },
  ];

  for (const test of tests) {
    const parsedEmail = await checkEmail(test.email, TEST_KEY_CODE);
    assertEquals(parsedEmail.email, test.expected.email);
    assertEquals(parsedEmail.result >= 8 && parsedEmail.result <= 10, true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedEmail, 'result_text'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedEmail, 'date'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedEmail, 'analysis'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedEmail.analysis, 'address'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedEmail.analysis, 'domain_reputation'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedEmail.analysis, 'mx_records'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedEmail, 'checks_remaining'), true);
  }
});

Deno.test('that .checkMessage() works', async () => {
  const tests: { message: string; expected: SafeMessageResponse }[] = [
    {
      message: 'Hello, world!',
      expected: {
        message: 'Hello, world!',
        result: 8,
        result_text: 'This message appears to be safe.',
        date: '2025-01-01',
        analysis: { content: 'This message appears to be safe.', sentiment: 'positive', links: [], emails: [] },
        checks_remaining: 1000,
      },
    },
  ];

  for (const test of tests) {
    const parsedMessage = await checkMessage(test.message, { keyCode: TEST_KEY_CODE });
    assertEquals(parsedMessage.message, test.expected.message);
    assertEquals(parsedMessage.result >= 8 && parsedMessage.result <= 10, true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedMessage, 'result_text'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedMessage, 'date'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedMessage, 'analysis'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedMessage.analysis, 'content'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedMessage.analysis, 'sentiment'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedMessage.analysis, 'links'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedMessage.analysis, 'emails'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedMessage, 'checks_remaining'), true);
  }
});

Deno.test('that .checkImage() works', async () => {
  const tests: { imageUrl: string; expected: SafeImageResponse }[] = [
    {
      imageUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      expected: {
        image_url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        result: 8,
        result_text: 'This image appears to be safe.',
        date: '2025-01-01',
        analysis: {
          description: 'This image appears to be safe.',
          link: {
            url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
            result: 8,
            date: '2025-01-01',
            analysis: {
              domain_reputation: "This domain wasn't found in any malicious lists.",
              source_code: 'This link returns a file.',
              anti_virus: 'No viruses found.',
            },
          },
        },
        checks_remaining: 1000,
      },
    },
  ];

  for (const test of tests) {
    const parsedImage = await checkImage(test.imageUrl, TEST_KEY_CODE);
    assertEquals(parsedImage.image_url, test.expected.image_url);
    assertEquals(parsedImage.result >= 8 && parsedImage.result <= 10, true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedImage, 'result_text'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedImage, 'date'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedImage, 'analysis'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedImage.analysis, 'description'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedImage.analysis, 'link'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedImage.analysis.link, 'url'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedImage.analysis.link, 'result'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedImage.analysis.link, 'date'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedImage.analysis.link, 'analysis'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedImage.analysis.link.analysis, 'domain_reputation'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedImage.analysis.link.analysis, 'source_code'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedImage.analysis.link.analysis, 'anti_virus'), true);
    assertEquals(Object.prototype.hasOwnProperty.call(parsedImage, 'checks_remaining'), true);
  }
});
