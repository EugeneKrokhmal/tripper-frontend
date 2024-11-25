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
}
