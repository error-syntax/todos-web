import { type Meta, type StoryObj } from '@storybook/react';

import ListItem from '../components/listMenu/listItem';

const meta = {
  title: 'Components/List Item',
  component: ListItem,
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const natural: Story = {
  args: {
    handleSubmit: () => {
      console.info('Not Implemented.');
    },
    list: { name: 'List Name', id: 0, archived: false },
  },
};

export const selected: Story = {
  args: {
    handleSubmit: () => {
      console.info('Not Implemented.');
    },
    list: { name: 'List Name', id: -1, archived: false },
  },
};
