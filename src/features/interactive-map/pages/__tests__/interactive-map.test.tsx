// Libraries
import { fireEvent } from '@testing-library/react';

// Components
import InteractiveMap from '../interactive-map';

// Utils
import { renderWithClient } from '../../../utils/testing-library.utils';

// Contexts
import { usePointsOfInterestContext } from '../../services/context/points-of-interest-context';

const mockUser = {
  email: 'lucas@gmail.com',
  password: '1234',
};

const mockActivePointOfInterest1 = {
  id: 'poi--7614962.505882401-907613.2738581821',
  title: '',
  description: '',
  coordinates: [-7614962.505882401, 907613.2738581821],
  createdAt: 'Mon Oct 07 2024',
  createdBy: mockUser.email,
  deletedAt: undefined,
};
const mockActivePointOfInterest2 = {
  coordinates: [-10066421.456523236, -1937504.1082510352],
  createdAt: 'Wed Oct 09 2024',
  createdBy: 'check1@gmail.com',
  description: '',
  id: 'poi--10066421.456523236--1937504.1082510352',
  title: 'Title',
};

const mockUsePointsOfInterestContext = usePointsOfInterestContext as jest.Mock;
jest.mock('../../services/context/points-of-interest-context', () => ({
  usePointsOfInterestContext: jest.fn(),
}));

describe('InteractiveMap', () => {
  it('Sets up all points of interest', () => {
    mockUsePointsOfInterestContext.mockReturnValue({
      usePointsOfInterestContext: () => ({
        pointsOfInterest: [
          mockActivePointOfInterest1,
          mockActivePointOfInterest2,
        ],
        updatePointOfInterest: jest.fn(),
        deletePointOfInterest: jest.fn(),
        createPointOfInterest: jest.fn(),
      }),
    });
    renderWithClient(<InteractiveMap authenticatedUser={mockUser} />);
  });
  it('Add/Close icon buttons switch on click - Used to add pins', () => {
    mockUsePointsOfInterestContext.mockReturnValue({
      usePointsOfInterestContext: () => ({
        pointsOfInterest: [
          mockActivePointOfInterest1,
          mockActivePointOfInterest2,
        ],
        updatePointOfInterest: jest.fn(),
        deletePointOfInterest: jest.fn(),
        createPointOfInterest: jest.fn(),
      }),
    });
    const { getByTestId, queryByText } = renderWithClient(
      <InteractiveMap authenticatedUser={mockUser} />
    );
    const addIconButton = getByTestId('add-pin-icon');
    fireEvent.click(addIconButton);

    const closeIconButton = getByTestId('close-pin-icon');
    expect(closeIconButton).toBeDefined();
    fireEvent.click(closeIconButton);

    const secondInstanceAddIcon = getByTestId('add-pin-icon');
    expect(secondInstanceAddIcon).toBeDefined();

    const secondInstanceCloseIcon = queryByText('close-pin-icon');
    expect(secondInstanceCloseIcon).toBeFalsy();
  });
});
