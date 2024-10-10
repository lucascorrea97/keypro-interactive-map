// Libraries
import { render } from '@testing-library/react';

// Components
import FormTextInput from '../form-text-input';

describe('FormTextInput', () => {
  it('Renders FormInput with error message', () => {
    const { getByText } = render(
      <FormTextInput label="Email" errorMessage="Email required" />
    );
    const FormInput = getByText('Email');
    const ErrorMessage = getByText('Email required');
    expect(ErrorMessage).toBeDefined();
    expect(FormInput).toBeDefined();
  });
});
