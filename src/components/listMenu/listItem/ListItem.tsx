import { Wrapper } from "./ListItem.styles";
import { ListItemProps } from "./ListItem.types";

export default function ListItem({ handleClick, listName, state = 'neutral' }: ListItemProps) {
  return (
    <Wrapper onClick={handleClick} state={state}>
      <p>{listName}</p>
    </Wrapper>
  )
}