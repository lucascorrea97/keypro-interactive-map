// Libraries
import { createRef, useState, useEffect, FormEvent } from 'react';
import { Stack, Box, ButtonGroup, Text } from '@chakra-ui/react';

// Containers
import FormTextInput from '../../../design-system/form-elements/form-text-input';
import FormTextarea from '../../../design-system/form-elements/form-textarea';

// Types
import { PointOfInterest } from '../services/types/point-of-interest.types';
import { Button } from '../../../design-system';

interface PointOfInterestFormProps {
  isEditing: boolean;
  activePointOfInterest: PointOfInterest;
  onCancel: () => void;
  onDelete: () => void;
  onSubmit: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => void;
}

const PointOfInterestForm = ({
  activePointOfInterest,
  isEditing,
  onDelete,
  onCancel,
  onSubmit,
}: PointOfInterestFormProps) => {
  // Refs
  const titleRef = createRef<HTMLInputElement>();

  // Form state
  const [title, setTitle] = useState(activePointOfInterest.title);
  const [description, setDescription] = useState(
    activePointOfInterest.description
  );

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  useEffect(() => {
    if (activePointOfInterest) {
      setTitle(activePointOfInterest.title);
      setDescription(activePointOfInterest.description);
      if (activePointOfInterest.title === '') {
        titleRef.current?.focus();
      }
    }
  }, [activePointOfInterest, setTitle, setDescription]);

  const resetErrors = () => {
    setTitleError('');
    setDescriptionError('');
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    resetErrors();

    // Validate title
    if (!title) {
      setTitleError('Title is required');
      isValid = false;
    }

    // Validate description
    if (!description) {
      setDescriptionError('Description is required');
      isValid = false;
    }

    // If everything is valid, submit the form
    if (isValid) {
      onSubmit({ title, description });
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Stack spacing={4}>
        <FormTextInput
          label="Title"
          id="title"
          placeholder="e.g. Brazil's largest telecom"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          ref={titleRef}
          errorMessage={titleError}
          isDisabled={!isEditing}
        />
        <FormTextarea
          label="Description"
          value={description}
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          errorMessage={descriptionError}
          isDisabled={!isEditing}
          placeholder="e.g. Vivo, constrolled by the Spanish Telefónica, is the leading mobile and landline carrier in Brazil."
        />
        <Text fontSize="sm">
          Created on {activePointOfInterest.createdAt} by{' '}
          {activePointOfInterest.createdBy}
        </Text>
        <Box justifyContent="space-between" display="flex">
          {isEditing && (
            <Button variant="secondary" onClick={() => onDelete()}>
              Delete
            </Button>
          )}
          <ButtonGroup display="flex" marginLeft="auto">
            <Button onClick={onCancel} variant="dismiss">
              Close
            </Button>
            {isEditing && (
              <Button variant="conversion" type="submit">
                Save
              </Button>
            )}
          </ButtonGroup>
        </Box>
      </Stack>
    </form>
  );
};

export default PointOfInterestForm;
