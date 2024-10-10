// Libraries
import { useRef, useEffect, useState } from 'react';
import { Map, MapBrowserEvent, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';
import 'ol/ol.css';

// Design System
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

// Containers
import ManagePointOfInterest from '../containers/manage-point-of-interest';

// Contexts
import { usePointsOfInterestContext } from '../services/context/points-of-interest-context';

// Types
import { User } from '../../authentication/services/types/user.types';
import { PointOfInterest } from '../services/types/point-of-interest.types';

interface InteractiveMapsProps {
  authenticatedUser: User;
}

const InteractiveMap = ({ authenticatedUser }: InteractiveMapsProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  // Prevent multiple map initializations
  const mapInitialized = useRef(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isAddPinEnabled, setIsAddPinEnabled] = useState(false);
  const [mapInstance, setMapInstance] = useState<Map | null>(null);
  const [markerLayer, setMarkerLayer] = useState<VectorLayer | null>(null);
  const [isMapSetup, setIsMapSetup] = useState(false);
  const [activePointOfInterest, setActivePointOfInterest] =
    useState<PointOfInterest | null>(null);

  const {
    pointsOfInterest,
    updatePointOfInterest,
    deletePointOfInterest,
    createPointOfInterest,
  } = usePointsOfInterestContext();

  useEffect(() => {
    // Avoid reinitializing the map
    if (mapInitialized.current) return;

    mapInitialized.current = true;

    const map = new Map({
      target: mapRef.current!,
      layers: [
        new TileLayer({
          source: new OSM(), // OpenStreetMap layer
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]), // Center at [longitude, latitude]
        zoom: 2, // Set initial zoom level
      }),
    });

    // Create a vector layer for points of interest
    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
    });

    // Add the vector layer to the map
    map.addLayer(vectorLayer);
    setMapInstance(map);
    setMarkerLayer(vectorLayer);
  }, []);

  const handleOnMapClick = async (event: MapBrowserEvent<any>) => {
    setIsAddPinEnabled(false);
    const coordinates = event.coordinate;
    const pointOfInterestId = `poi-${coordinates[0]}-${coordinates[1]}`;

    const pointOfInterestData: PointOfInterest = {
      id: pointOfInterestId,
      coordinates,
      title: '',
      description: '',
      createdAt: new Date().toDateString(),
      createdBy: authenticatedUser.email,
    };

    // Create a new point of interest at the clicked location
    const pointOfInterest = new Feature({
      geometry: new Point(coordinates),
      ...pointOfInterestData,
    });

    // Set a red pin icon style
    pointOfInterest.setStyle(
      new Style({
        image: new Icon({
          src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg', // Red pin icon URL
          anchor: [0.5, 0.5],
          scale: 1.5, // Adjust the size of the icon
        }),
      })
    );

    // Add the point of interest to the marker layer
    markerLayer!.getSource()?.addFeature(pointOfInterest);

    await createPointOfInterest(pointOfInterestData);
  };

  const setupPointsOfInterest = (
    pointsOfInterestToSet: PointOfInterest[],
    markerLayer: VectorLayer<VectorSource<any>, any> | null
  ) => {
    if (!isMapSetup) {
      pointsOfInterestToSet.forEach((pointOfInterest) => {
        // Create a new point of interest at the clicked location
        const newPointOfInterest = new Feature({
          geometry: new Point(pointOfInterest.coordinates),
          id: pointOfInterest.id,
          coordinates: pointOfInterest.coordinates,
          createdAt: pointOfInterest.createdAt,
          title: pointOfInterest.title,
          description: pointOfInterest.description,
          createdBy: pointOfInterest.createdBy,
        });

        // Set title below the point of interest
        addPinTitle(pointOfInterest);

        // Set a red pin icon style
        newPointOfInterest.setStyle(
          new Style({
            image: new Icon({
              src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg', // Red pin icon URL
              anchor: [0.5, 0.5],
              scale: 1.5, // Adjust the size of the icon
            }),
          })
        );

        // Add the point of interest to the marker layer
        markerLayer!.getSource()?.addFeature(newPointOfInterest);
      });
      setIsMapSetup(true);
    }
  };

  useEffect(() => {
    if (mapInstance && markerLayer && pointsOfInterest) {
      setupPointsOfInterest(pointsOfInterest, markerLayer);
      if (isAddPinEnabled) {
        mapInstance.on('click', handleOnMapClick);
      } else {
        // Removes click listeners when add point of interest is not enabled
        const clickListeners = mapInstance.getListeners('click');
        if (clickListeners) {
          mapInstance.removeEventListener('click', clickListeners[0]);
        }
      }
    }
  }, [mapInstance, markerLayer, isAddPinEnabled, pointsOfInterest]);

  /**
   * Uses forEachFeatureAtPixel to detect if a point of interest was clicked
   * Then saves the clicked point of interest as the active point of interest
   */
  useEffect(() => {
    if (mapInstance) {
      mapInstance.on('singleclick', (event) => {
        mapInstance.forEachFeatureAtPixel(event.pixel, (feature) => {
          const id = feature.get('id');
          const selectedPointOfInterest = pointsOfInterest.find(
            (pointOfInterest) => pointOfInterest.id === id
          );
          if (selectedPointOfInterest) {
            setActivePointOfInterest({
              id: selectedPointOfInterest.id,
              title: selectedPointOfInterest?.title,
              coordinates: selectedPointOfInterest?.coordinates,
              description: selectedPointOfInterest?.description,
              createdAt: selectedPointOfInterest?.createdAt,
              createdBy: selectedPointOfInterest?.createdBy,
            });
            onOpen();
          }
        });
      });
    }
  }, [mapInstance, setActivePointOfInterest, pointsOfInterest]);

  const handleAddPinClick = (isEnabled: boolean) => {
    setIsAddPinEnabled(isEnabled);
  };

  const addPinTitle = (pointOfInterest: PointOfInterest) => {
    if (mapInstance) {
      const textElement = document.createElement('div');
      // textElement.className = 'text-overlay';
      textElement.innerHTML = pointOfInterest.title; // Add your dynamic text
      textElement.style.backgroundColor = 'white'; // maybe remove this color
      textElement.style.fontSize = '14px';
      textElement.style.width = '84px';
      textElement.setAttribute('data-testid', pointOfInterest.title);

      // Add CSS for positioning the text
      textElement.style.position = 'relative';
      textElement.style.left = '0px';
      textElement.style.bottom = '0px'; // Positioning the text below the pin
      textElement.style.textAlign = 'center';
      textElement.style.setProperty('text-overflow', 'ellipsis');
      textElement.style.setProperty('overflow', 'hidden');
      textElement.style.setProperty('text-wrap', 'nowrap');

      // Create an overlay to display the text
      const textOverlay = new Overlay({
        element: textElement,
        id: pointOfInterest.id,
        position: pointOfInterest.coordinates,
        positioning: 'bottom-center', // Positioning text below the pin
        offset: [0, -10], // Adjust the offset to move the text below the pin
      });

      mapInstance.addOverlay(textOverlay);
    }
  };

  const handleOnSavePointOfInterestDetails = async ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    if (activePointOfInterest) {
      const updatedActivePointOfInterest = Object.assign(
        {},
        activePointOfInterest
      );
      updatedActivePointOfInterest.title = title;
      updatedActivePointOfInterest.description = description;
      const hasUpdates =
        activePointOfInterest.title !== updatedActivePointOfInterest.title ||
        activePointOfInterest.description !==
          updatedActivePointOfInterest.description;
      if (hasUpdates) {
        removeTitleOverlay(updatedActivePointOfInterest);
        setActivePointOfInterest(updatedActivePointOfInterest);
        await updatePointOfInterest(updatedActivePointOfInterest);
        addPinTitle(updatedActivePointOfInterest);
        onClose();
      } else {
        // No updates just close the popup
        onClose();
      }
    }
  };

  const removeTitleOverlay = (pointOfInterest: PointOfInterest) => {
    const titleOverlay = mapInstance?.getOverlayById(pointOfInterest.id);
    if (titleOverlay) {
      mapInstance?.removeOverlay(titleOverlay);
    }
  };

  const handleOnDelete = () => {
    if (activePointOfInterest && markerLayer) {
      deletePointOfInterest(activePointOfInterest.id);
      setActivePointOfInterest(null);
      const deletedPointOfInterest = markerLayer
        .getSource()
        ?.getFeaturesAtCoordinate(activePointOfInterest.coordinates)[0];
      markerLayer.getSource()?.removeFeature(deletedPointOfInterest);
      removeTitleOverlay(activePointOfInterest);
    }
  };

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100vh' }}>
      {activePointOfInterest && (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>POI Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody paddingBottom="4">
              <ManagePointOfInterest
                onCancel={onClose}
                authenticatedUser={authenticatedUser}
                onDelete={handleOnDelete}
                onSavePointOfInterestDetails={
                  handleOnSavePointOfInterestDetails
                }
                activePointOfInterest={activePointOfInterest}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {!isAddPinEnabled ? (
        <IconButton
          data-testid="add-pin-icon"
          position="absolute"
          bottom="16px"
          left="16px"
          aria-label="Add"
          icon={<AddIcon height={5} width={5} />}
          zIndex={1}
          onClick={() => handleAddPinClick(true)}
        />
      ) : (
        <IconButton
          data-testid="close-pin-icon"
          position="absolute"
          bottom="16px"
          left="16px"
          aria-label="Close"
          icon={<CloseIcon height={4} width={4} />}
          zIndex={1}
          onClick={() => handleAddPinClick(false)}
        />
      )}
    </div>
  );
};

export default InteractiveMap;
