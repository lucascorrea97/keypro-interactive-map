// Libraries
import { fireEvent, render } from '@testing-library/react';

// Components
import PointOfInterestForm from '../point-of-interest-form';

const mockActivePointOfInterest = {
  id: 'poi--7614962.505882401-907613.2738581821',
  title: '',
  description: '',
  coordinates: [-7614962.505882401, 907613.2738581821],
  createdAt: 'Mon Oct 07 2024',
  createdBy: 'lucas@gmail.com',
  deletedAt: undefined,
};

const mockTitle = 'Brazil';
const mockDescription = 'Telecom';

describe('PointOfInterestForm', () => {
  it('Form is only visible when editing mode is false', () => {
    const mockOnCancel = jest.fn();
    const mockOnDelete = jest.fn();
    const mockOnSubmit = jest.fn();
    const { queryByText, getByText } = render(
      <PointOfInterestForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
        isEditing={false}
        activePointOfInterest={mockActivePointOfInterest}
      />
    );

    const saveButton = queryByText('Save');
    const deleteButton = queryByText('Delete');

    expect(saveButton).toBe(null);
    expect(deleteButton).toBe(null);

    // Closes form
    const onCancel = getByText('Close');
    fireEvent.click(onCancel);

    expect(mockOnCancel).toHaveBeenCalled();
  });
  it('Delete active point of interest - Editing mode on', () => {
    const mockOnCancel = jest.fn();
    const mockOnDelete = jest.fn();
    const mockOnSubmit = jest.fn();
    const { getByText } = render(
      <PointOfInterestForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
        isEditing={true}
        activePointOfInterest={mockActivePointOfInterest}
      />
    );

    // Closes form
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalled();
  });
  it('Updates active point of interest - Editing mode on', () => {
    const mockOnCancel = jest.fn();
    const mockOnDelete = jest.fn();
    const mockOnSubmit = jest.fn();
    const { getByText, getByLabelText } = render(
      <PointOfInterestForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
        isEditing={true}
        activePointOfInterest={mockActivePointOfInterest}
      />
    );
    const titleInput = getByLabelText('Title');
    const descriptionTextarea = getByLabelText('Description');

    // Triggers input udpates with invalid email & password
    fireEvent.change(titleInput, { target: { value: mockTitle } });
    fireEvent.change(descriptionTextarea, {
      target: { value: mockDescription },
    });

    // Closes form
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: mockTitle,
      description: mockDescription,
    });
  });
  it('Updates active point of interest - Editing mode on - Triggers required errors', () => {
    const mockOnCancel = jest.fn();
    const mockOnDelete = jest.fn();
    const mockOnSubmit = jest.fn();
    const { getByText, getByLabelText } = render(
      <PointOfInterestForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
        isEditing={true}
        activePointOfInterest={mockActivePointOfInterest}
      />
    );

    // Closes form
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);

    const titleRequiredError = getByText('Title is required');
    const descriptionRequiredError = getByText('Description is required');

    expect(titleRequiredError).toBeDefined();
    expect(descriptionRequiredError).toBeDefined();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
