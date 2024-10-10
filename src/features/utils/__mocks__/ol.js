jest.mock('ol', () => ({Map: () => ({addOverlay: jest.fn(), addLayer: jest.fn(), getListeners: jest.fn(), on: jest.fn()}), View: jest.fn()}))

jest.mock('ol/ol.css', () => {})

jest.mock('ol/Feature', () => jest.fn(() => ({setStyle: jest.fn()})))
jest.mock('ol/style', () => ({Style: jest.fn(), Icon: jest.fn()}))
jest.mock('ol/proj', () => ({fromLonLat: jest.fn()}))
jest.mock('ol/Overlay', () => jest.fn())

jest.mock('ol/layer/Tile', () => jest.fn())
jest.mock('ol/layer/Vector', () => jest.fn(() => ({getSource: jest.fn()})))

jest.mock('ol/source/OSM', () => jest.fn())
jest.mock('ol/source/Vector', () => jest.fn())

jest.mock('ol/geom/Point', () => jest.fn())