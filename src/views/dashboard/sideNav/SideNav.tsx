import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { Column, Spacer } from '@/components/containers';
import { ModeToggle } from '@/components/mode-toggle';
import { userContext } from '@/signals/users.signals';

export default function SideNav() {
  return (
    <Column>
      <ModeToggle />
      <Spacer $height={12} />
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>{userContext.value.name}</AvatarFallback>
      </Avatar>
    </Column>
  );
}
