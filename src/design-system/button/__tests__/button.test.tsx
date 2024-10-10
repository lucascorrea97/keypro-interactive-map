// Libraries
import { render } from '@testing-library/react';

// Components
import { Button } from '../..';

describe('Button', () => {
  it('Renders themed button', () => {
    const { getByText } = render(<Button margin={2}>Text</Button>);
    const buttonElement = getByText('Text');
    expect(buttonElement).toBeDefined();
  });
});
