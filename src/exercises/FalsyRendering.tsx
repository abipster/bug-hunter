// @ts-nocheck -- the broken code below has deliberate type errors (remove this line in your fix to see them)
import { useEffect, useState } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export const getId: Exercise['getId'] = () => 8;
export const getDescription: Exercise['getDescription'] = () => 'A stray `0` appears under the cart title; the page crashes with "Cannot read properties of undefined" on first load.';
export const getDifficulty: Exercise['getDifficulty'] = () => 2;
export const getHints: Exercise['getHints'] = () => [
  'TypeScript strict mode should already flag some of these lines.',
  'What does `0 && <X/>` evaluate to?',
  'What is `cart` during the first render?',
];
export const getFix: Exercise['getFix'] = () => [
  'Early return `if (!cart) return <p>Loading…</p>;`.',
  'Use `cart.items.length > 0 && …` (or a ternary) so a stray `0` is not rendered.',
  'Use optional chaining: `cart.coupon?.code ?? \'none\'`. Mention a discriminated-union state (`loading | ready`) to remove the optionality altogether.',
];

type Cart = { items: { id: string; name: string; price: number }[]; coupon?: { code: string } };

export default function FalsyRendering() {
  const [cart, setCart] = useState<Cart>();

  useEffect(() => {
    setTimeout(() => setCart({ items: [] }), 500);
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      {cart.items.length && <ul>{cart.items.map(i => <li key={i.id}>{i.name}</li>)}</ul>}
      <p>Total: {cart.items.reduce((s, i) => s + i.price, 0).toFixed(2)}</p>
      <p>Coupon: {cart.coupon.code}</p>
    </div>
  );
}
