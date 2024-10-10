// Libraries
import { fireEvent, render } from '@testing-library/react';

// Components
import ManagePointOfInterest from '../manage-point-of-interest';
import { renderWithClient } from '../../../utils/testing-library.utils';

const mockUser = {
  email: 'lucas@gmail.com',
  password: '1234',
};

const mockActivePointOfInterest = {
  id: 'poi--7614962.505882401-907613.2738581821',
  title: '',
  description: '',
  coordinates: [-7614962.505882401, 907613.2738581821],
  createdAt: 'Mon Oct 07 2024',
  createdBy: mockUser.email,
  deletedAt: undefined,
};

describe('ManagePointOfInterest', () => {
  it('Delete point of interest - Are you sure - Yes', () => {
    const mockOnCancel = jest.fn();
    const mockOnDelete = jest.fn();
    const { getByText } = renderWithClient(
      <ManagePointOfInterest
        onSavePointOfInterestDetails={() => null}
        authenticatedUser={mockUser}
        activePointOfInterest={mockActivePointOfInterest}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);

    const yesButton = getByText('Yes');
    fireEvent.click(yesButton);

    expect(mockOnDelete).toHaveBeenCalled();
  });
});
