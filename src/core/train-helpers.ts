/**
 * Train helper functions for direction-aware car access
 *
 * The "lead car" is the car at the front of the train in the current
 * travel direction. The "tail car" is the car at the rear.
 *
 * When travelDirection is 'forward', lead = cars[0], tail = cars[last].
 * When travelDirection is 'backward', lead = cars[last], tail = cars[0].
 */

import { Train, Car } from './types';

/**
 * Get the lead car (front in current travel direction)
 */
export function getLeadCar(train: Train): Car {
  return train.travelDirection === 'forward'
    ? train.cars[0]
    : train.cars[train.cars.length - 1];
}

/**
 * Get the tail car (rear in current travel direction)
 */
export function getTailCar(train: Train): Car {
  return train.travelDirection === 'forward'
    ? train.cars[train.cars.length - 1]
    : train.cars[0];
}

/**
 * Get the index of the lead car
 */
export function getLeadCarIndex(train: Train): number {
  return train.travelDirection === 'forward'
    ? 0
    : train.cars.length - 1;
}

/**
 * Get the index of the tail car
 */
export function getTailCarIndex(train: Train): number {
  return train.travelDirection === 'forward'
    ? train.cars.length - 1
    : 0;
}
