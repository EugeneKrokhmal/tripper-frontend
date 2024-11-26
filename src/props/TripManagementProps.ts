import { User } from '../types/User';
import { Trip } from '../types/Trip';

export interface ShareTripProps {
    tripId: string;
    tripName: string;
    tripImage: string;
    startDate: string;
    endDate: string;
    tripDescription: string;
    isOwner: boolean;
    isAdmin: boolean;
    joinLink: string | null;
    onGenerateJoinLink: () => void;
    loadingJoinLink: boolean;
    error: string | null;
}

export interface EditTripFormProps {
    trip: Trip;
    participants: User[];
    administrators: string[],
    id: string;
    initialTripName: string;
    initialTripDescription: string;
    initialDestination: string;
    initialStartDate: string;
    initialEndDate: string;
    initialCoordinates: { lat: number; lng: number };
    onDeleteClick: () => void;
    onSubmit: (updatedTrip: {
        tripName: string;
        tripDescription: string;
        destination: string;
        startDate: string;
        endDate: string;
        coordinates: { lat: number; lng: number };
    }) => void;
    onCancel: () => void;
    onImageUploadSuccess: (imageUrl: string) => void;
    onParticipantDelete: (updatedParticipants: User[]) => void;
}
