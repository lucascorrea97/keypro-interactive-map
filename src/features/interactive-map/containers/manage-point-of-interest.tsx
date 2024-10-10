// Types
import { User } from '../../authentication/services/types/user.types';
import { PointOfInterest } from '../services/types/point-of-interest.types';

// Design System
import { Button, Box } from '../../../design-system';
import {
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

// Containers
import PointOfInterestForm from './point-of-interest-form';

interface ManagePointOfInterestProps {
  authenticatedUser?: User;
  activePointOfInterest: PointOfInterest;
  onSavePointOfInterestDetails: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => void;
  onDelete: () => void;
  onCancel: () => void;
}

const ManagePointOfInterest = (props: ManagePointOfInterestProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    authenticatedUser,
    activePointOfInterest,
    onSavePointOfInterestDetails,
    onDelete,
    onCancel,
  } = props;

  const isCreatedByAuthenticatedUser =
    authenticatedUser?.email === activePointOfInterest.createdBy;

  const handleOnDeletePointOfInterest = () => {
    onOpen();
  };

  return (
    <Box>
      <PointOfInterestForm
        isEditing={isCreatedByAuthenticatedUser}
        activePointOfInterest={activePointOfInterest}
        onDelete={handleOnDeletePointOfInterest}
        onSubmit={onSavePointOfInterestDetails}
        onCancel={onCancel}
      />
      <Modal size="xs" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={2}>
          <ModalHeader pt={1}>Are you sure you want to delete?</ModalHeader>
          <ModalBody>
            <ButtonGroup display="flex" justifyContent="flex-end">
              <Button variant="dismiss" onClick={onClose}>
                No
              </Button>
              <Button onClick={onDelete} variant="secondary">
                Yes
              </Button>
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ManagePointOfInterest;
