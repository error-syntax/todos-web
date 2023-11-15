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
    listName: 'Default List state',
  },
};

export const selected: Story = {
  args: {
    listName: 'Selected List',
    state: 'selected',
  },
};
