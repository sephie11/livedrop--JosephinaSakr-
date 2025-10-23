import ground from './ground-truth.json';
import { api } from '../lib/api'; 


type OrderStatus = {
  status: string;
  carrier?: string;
  eta?: string;
};

const ORDER_RX = /[A-Z0-9]{10,}/i;


function tokenize(s?: string) {
  return (s ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

export async function askSupport(input: string): Promise<{ text: string }> {
  const orderMatch = input.match(ORDER_RX);
  let statusText = '';

  // ---- Order status check ----
  if (orderMatch) {
    const id = orderMatch[0];
    const masked = id.slice(-4).padStart(id.length, '•');

    try {
    
      const status = (await api.getOrderStatus(id)) as OrderStatus;

      const eta = status.eta
        ? ` ETA ${new Date(status.eta).toLocaleDateString()}.`
        : '';
      statusText =
        `\nOrder ${masked}: ${status.status}.` +
        (status.carrier ? ` Carrier ${status.carrier}.` : '') +
        eta +
        '\n';
    } catch (err) {
      console.error('Failed to fetch order status:', err);
      statusText = `\nOrder ${masked}: could not retrieve status (backend may be offline).\n`;
    }
  }

  // ---- Ground-truth Q&A matching ----
  const qTokens = tokenize(input);
  type QA = {
    q?: string;
    a?: string;
    qid?: string;
    question?: string;
    answer?: string;
  };

  const groundQs = ground as QA[];
  let best: { q: string; a: string; qid?: string } | null = null;
  let bestScore = 0;

  for (const qa of groundQs) {
    const qText = qa.q ?? qa.question ?? '';
    const aText = qa.a ?? qa.answer ?? '';
    const t = tokenize(qText);
    const overlap = t.filter((x) => qTokens.includes(x)).length;
    if (overlap > bestScore) {
      bestScore = overlap;
      best = { q: qText, a: aText, qid: qa.qid };
    }
  }

  // ---- Response generation ----
  if (best && bestScore >= 2) {
    return {
      text: `${statusText}${best.a}${
        best.qid ? ` [${best.qid}]` : ''
      }`,
    };
  }

  if (statusText) {
    return {
      text: `${statusText}I can only answer policy questions from our ground-truth. Please rephrase or check the Help Center.`,
    };
  }

  return {
    text: 'Sorry — this is out of scope for the Support panel. I only answer from our ground-truth Q&A and order status.',
  };
}
