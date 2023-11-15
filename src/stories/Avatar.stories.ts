import { type Meta, type StoryObj } from '@storybook/react';

import Avatar from '../components/avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'dropdown' },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    background: undefined,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    background: undefined,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    background: undefined,
    size: 'lg',
  },
};
