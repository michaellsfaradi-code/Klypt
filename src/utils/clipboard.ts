/**
 * Bulletproof clipboard utility that works across:
 * 1. Modern navigator.clipboard API
 * 2. Fallback offscreen <textarea> with execCommand('copy') for iframes / sandboxes
 * 3. Selection range fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // Attempt 1: Modern async Clipboard API
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Failed or permission denied in iframe, proceed to fallback
    }
  }

  // Attempt 2: Document execCommand fallback via visible-in-DOM offscreen textarea
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.opacity = '0.01';
    textArea.setAttribute('readonly', '');

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, text.length);

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    if (successful) return true;
  } catch {
    // execCommand failed
  }

  // Attempt 3: Selection API fallback
  try {
    const span = document.createElement('span');
    span.textContent = text;
    span.style.whiteSpace = 'pre';
    span.style.position = 'fixed';
    span.style.opacity = '0.01';
    document.body.appendChild(span);

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNode(span);
    selection?.removeAllRanges();
    selection?.addRange(range);

    const successful = document.execCommand('copy');
    selection?.removeAllRanges();
    document.body.removeChild(span);
    if (successful) return true;
  } catch {
    // Failed
  }

  return false;
}
