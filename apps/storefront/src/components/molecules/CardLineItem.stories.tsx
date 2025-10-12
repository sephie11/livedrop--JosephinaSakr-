import CartLineItem from './CartLineItem';

export default {
  title: 'Molecules/CartLineItem',
  component: CartLineItem,
};

export const Default = {
  args: {
    item: {
      id: '1',
      title: 'Blue T-Shirt',
      price: 19.99,
      qty: 1,
      image: '/mock-catalog.png',
    },
  },
};

export const MultipleQuantity = {
  args: {
    item: {
      id: '2',
      title: 'Red Hoodie',
      price: 29.99,
      qty: 3,
      image: '/mock-catalog.png',
    },
  },
};
