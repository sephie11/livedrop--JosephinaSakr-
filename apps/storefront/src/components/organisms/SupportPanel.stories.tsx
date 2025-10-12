import type { Meta, StoryObj } from '@storybook/react-vite';
import {SupportPanel} from './SupportPanel';

const meta: Meta<typeof SupportPanel> = {
  title: 'Organisms/SupportPanel',
  component: SupportPanel,
};

export default meta;
type Story = StoryObj<typeof SupportPanel>;

export const Default: Story = {};
export const Expanded: Story = {
  args: { open: true },
};
