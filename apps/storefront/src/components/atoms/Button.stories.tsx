import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  args: { children: 'Click me' },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { className: 'bg-blue-600 hover:bg-blue-700' },
};

export const Secondary: Story = {
  args: { className: 'bg-gray-300 text-black hover:bg-gray-400' },
};
