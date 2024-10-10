// Libraries
import { render } from '@testing-library/react';

// Components
import FormTextarea from '../form-textarea';

describe('FormTextarea', () => {
  it('Renders FormTextarea with error message', () => {
    const { getByText } = render(
      <FormTextarea
        label="Description"
        errorMessage="Description is required"
      />
    );
    const FormInput = getByText('Description');
    const ErrorMessage = getByText('Description is required');
    expect(ErrorMessage).toBeDefined();
    expect(FormInput).toBeDefined();
  });
});
