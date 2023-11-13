import styled from 'styled-components';

const Input = styled.input(({ theme: { input }}) => `
  background-color: ${input.background};
  border: 1px solid ${input.border};
  border-radius: 4px;
  color: ${input.text};
  font-size: 16px;
  line-height: 20px;
  outline-offset: 2px;
  padding: 8px;

  &:hover {
    background-color: ${input.hover.background};
    border: 1px solid ${input.hover.border};
    color: ${input.hover.text};
    outline: 1px solid ${input.hover.outline};
  }

  &:focus {
    background-color: ${input.focus.background};
    border: 1px solid ${input.focus.border};
    color: ${input.focus.text};
    outline: 1px solid ${input.focus.outline};
  }
`);

const Label = styled.label(({ theme: { text } }) => `
  color: ${text};
  font-size: 14px;
  line-height: 18px;
`);

const Button = styled.button(({ theme: { button } }) => `
  background: ${button.background};
  border: 1px solid ${button.border};
  border-radius: 4px;
  color: ${button.text};
  cursor: pointer;
  display: flex;
  font-size: 16px;
  justify-content: center;
  line-height: 20px;
  outline-offset: 2px;
  padding: 8px 12px;
  text-align: center;

  &:hover {
    background-color: ${button.hover.background};
    border-color: ${button.hover.border};
    color: ${button.hover.text};
  }

  &:focus {
    background-color: ${button.focus.background};
    border-color: ${button.focus.border};
    color: ${button.focus.text};
    outline: 1px solid ${button.focus.outline};
  }
`);

const ErrorWrapper = styled.div`
  color: #cc0000;
  font-size: 12px;
  line-height: 16px;
  padding: 0;
  margin: 0;
`;

export {
  Button,
  ErrorWrapper,
  Input,
  Label,
}