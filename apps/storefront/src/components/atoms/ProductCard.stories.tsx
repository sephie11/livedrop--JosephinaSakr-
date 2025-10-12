import type { Meta, StoryObj } from '@storybook/react-vite';
import ProductCard from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: {
      title: 'Yoga Mat',
      price: 24.99,
      image: '/mock-catalog.png', 
      stockQty: 10,
      tags: ['fitness', 'accessory'],
    },
  },
};

export const OutOfStock: Story = {
  args: {
    product: {
      title: 'Foam Roller',
      price: 19.99,
      image: '/mock-catalog.png',
      stockQty: 0,
      tags: ['training'],
    },
  },
};
