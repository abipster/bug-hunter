// @ts-nocheck -- the broken code below has deliberate type errors (remove this line in your fix to see them)
import { useEffect, useState } from 'react';
import type { ExerciseFix } from '../interfaces/ExerciseFix';

export const getId: ExerciseFix['getId'] = () => 8;
export const getDescription: ExerciseFix['getDescription'] = () => 'Fix the bug in this component.'

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
