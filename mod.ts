/**
 * The response from the `checkLink` function.
 */
export interface SafeLinkResponse {
  url: string;
  result: number;
  result_text: string;
  date: string;
  analysis: {
    domain_reputation: string;
    source_code: string;
    anti_virus: string;
  };
  checks_remaining: number;
}

/**
 * This function securely checks if a link is safe to click or visit.
 * You can find the API documentation for this endpoint at https://safelyx.com/safe-api#safe-link-checker.
 *
 * ```ts
 * const safeLinkResponse = await checkLink('example.com'); // { url: "https://example.com", result: 8, result_text: "This link looks safe.", date: "2025-01-01", analysis: { domain_reputation: "This domain wasn't found in any malicious lists.", source_code: "This website appears to have only basic HTML.", anti_virus: "N/A" }, checks_remaining: 1000 }
 * ```
 *
 * @param link - The URL to check.
 * @param keyCode - The purchased key code at https://safelyx.com/pricing in order to bypass the free limit.
 * @returns The safe link response.
 */
export async function checkLink(link: string, keyCode?: string): Promise<SafeLinkResponse> {
  const response = await fetch('https://safelyx.com/safe-link-checker', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ link, key_code: keyCode }),
  });

  return await response.json() as SafeLinkResponse;
}

/**
 * The response from the `checkEmail` function.
 */
export interface SafeEmailResponse {
  email: string;
  result: number;
  result_text: string;
  date: string;
  analysis: {
    address: string;
    domain_reputation: string;
    mx_records: string;
  };
  checks_remaining: number;
}

/**
 * This function securely checks if an email address is legitimate.
 * You can find the API documentation for this endpoint at https://safelyx.com/safe-api#safe-email-checker.
 *
 * ```ts
 * const safeEmailResponse = await checkEmail('test@example.com'); // { email: "test@example.com", result: 8, result_text: "This email looks legitimate.", date: "2025-01-01", analysis: { address: "This email address is valid.", domain_reputation: "This domain isn't found in any malicious lists.", mx_records: "This domain has valid MX records." }, checks_remaining: 1000 }
 * ```
 *
 * @param email - The email address to check.
 * @param keyCode - The purchased key code at https://safelyx.com/pricing in order to bypass the free limit.
 * @returns The safe email response.
 */
export async function checkEmail(email: string, keyCode?: string): Promise<SafeEmailResponse> {
  const response = await fetch('https://safelyx.com/safe-email-checker', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ email, key_code: keyCode }),
  });

  return await response.json() as SafeEmailResponse;
}

/**
 * The response from the `checkMessage` function.
 */
export interface SafeMessageResponse {
  message: string;
  result: number;
  result_text: string;
  date: string;
  analysis: {
    content: string;
    sentiment: string;
    links: Omit<SafeLinkResponse, 'result_text' | 'checks_remaining'>[];
    emails: Omit<SafeEmailResponse, 'result_text' | 'checks_remaining'>[];
  };
  checks_remaining: number;
}

/**
 * This function securely checks if a message's content is safe.
 * You can find the API documentation for this endpoint at https://safelyx.com/safe-api#safe-message-checker.
 *
 * ```ts
 * const safeMessageResponse = await checkMessage('Hello, world!'); // { message: "Hello, world!", result: 8, result_text: "This message appears to be safe.", date: "2025-01-01", analysis: { content: "This message appears to be safe.", sentiment: "neutral", links: [], emails: [] }, checks_remaining: 1000 }
 * ```
 *
 * @param message - The message to check.
 * @param skipLinkAndEmailChecks - Whether to skip the link and email checks.
 * @param keyCode - The purchased key code at https://safelyx.com/pricing in order to bypass the free limit.
 * @returns The safe message response.
 */
export async function checkMessage(
  message: string,
  { skipLinkAndEmailChecks = false, keyCode }: { skipLinkAndEmailChecks?: boolean; keyCode?: string } = {},
): Promise<SafeMessageResponse> {
  const response = await fetch('https://safelyx.com/safe-message-checker', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      message,
      skip_link_and_email_checks: skipLinkAndEmailChecks,
      key_code: keyCode,
    }),
  });

  return await response.json() as SafeMessageResponse;
}

/**
 * The response from the `checkImage` function.
 */
export interface SafeImageResponse {
  image_url: string;
  result: number;
  result_text: string;
  date: string;
  analysis: {
    description: string;
    link: Omit<SafeLinkResponse, 'result_text' | 'checks_remaining'>;
  };
  checks_remaining: number;
}

/**
 * This function securely checks if an image is safe.
 * You can find the API documentation for this endpoint at https://safelyx.com/safe-api#safe-image-checker.
 *
 * ```ts
 * const safeImageResponse = await checkImage('https://example.com/image.jpg'); // { image_url: "https://example.com/image.jpg", result: 8, result_text: "This image appears to be safe.", date: "2025-01-01", analysis: { description: "This image appears to be safe.", link: { url: "https://example.com/image.jpg", result: 8, result_text: "This link looks safe.", date: "2025-01-01", analysis: { domain_reputation: "This domain wasn't found in any malicious lists.", source_code: "This link returns a file.", anti_virus: "No viruses found." }, checks_remaining: 1000 } }, checks_remaining: 1000 }
 * ```
 *
 * @param imageUrl - The URL of the image to check.
 * @param keyCode - The purchased key code at https://safelyx.com/pricing in order to bypass the free limit.
 * @returns The safe image response.
 */
export async function checkImage(imageUrl: string, keyCode?: string): Promise<SafeImageResponse> {
  const response = await fetch('https://safelyx.com/safe-image-checker', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      image_url: imageUrl,
      key_code: keyCode,
    }),
  });

  return await response.json() as SafeImageResponse;
}

/**
 * This simply exports the `checkLink`, `checkEmail`, `checkMessage` and `checkImage` functions as the default export.
 *
 * ```ts
 * import safelyx from '@safelyx/api'; // or import safelyx from 'jsr:@safelyx/api@0.1.0'; // or import safelyx from 'https://deno.land/x/safelyx@0.1.0/mod.ts';
 *
 * const safeLinkResponse = await safelyx.checkLink('example.com'); // { url: "https://example.com", result: 8, result_text: "This link looks safe.", date: "2025-01-01", analysis: { domain_reputation: "This domain wasn't found in any malicious lists.", source_code: "This website appears to have only basic HTML.", anti_virus: "N/A" }, checks_remaining: 1000 }
 * const safeEmailResponse = await safelyx.checkEmail('test@example.com'); // { email: "test@example.com", result: 8, result_text: "This email looks legitimate.", date: "2025-01-01", analysis: { address: "This email address is valid.", domain_reputation: "This domain isn't found in any malicious lists.", mx_records: "This domain has valid MX records." }, checks_remaining: 1000 }
 * const safeMessageResponse = await safelyx.checkMessage('Hello, world!'); // { message: "Hello, world!", result: 8, result_text: "This message appears to be safe.", date: "2025-01-01", analysis: { content: "This message appears to be safe.", sentiment: "neutral", links: [], emails: [] }, checks_remaining: 1000 }
 * const safeImageResponse = await safelyx.checkImage('https://example.com/image.jpg'); // { image_url: "https://example.com/image.jpg", result: 8, result_text: "This image appears to be safe.", date: "2025-01-01", analysis: { description: "This image appears to be safe.", link: { url: "https://example.com/image.jpg", result: 8, result_text: "This link looks safe.", date: "2025-01-01", analysis: { domain_reputation: "This domain wasn't found in any malicious lists.", source_code: "This link returns a file.", anti_virus: "No viruses found." }, checks_remaining: 1000 } }, checks_remaining: 1000 }
 * ```
 */
export default { checkLink, checkEmail, checkMessage, checkImage };
