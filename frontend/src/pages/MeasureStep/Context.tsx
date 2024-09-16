import { createContext, useContext } from 'react';

export interface MeasureInfo {
  imageUrl?: string;
  measureValue?: number;
  measureType?: string;
  measureUuid?: string;
}

interface MeasureContext extends MeasureInfo{
  isConfirm: boolean;
  onSetMeasure: (values: MeasureInfo) => void
  onConfirm: (value: boolean) => void
}

export const MeasureContext = createContext<MeasureContext | null>(null);


export const useMeasureContext = () => {
	let context = useContext(MeasureContext);

	if (!context)
		throw new Error(
			'Child components of Measure cannot be rendered outside the Measure component!',
		);

	return context;
};