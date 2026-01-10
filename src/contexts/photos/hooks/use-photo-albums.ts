import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from '@src/helpers/api';

export default function usePhotoAlbums() {
    const queryClient = useQueryClient();

    async function managePhotoOnAlbum(photoId: string, albumsIds: string[]) {
        try {
            await api.put(`/photos/${photoId}/albums`, {
                albumsIds,
            });

            queryClient.invalidateQueries({ queryKey: ['photos', photoId] });
            queryClient.invalidateQueries({ queryKey: ['photos'] });

            toast.success('Photo albums updated successfully.');
        } catch (error) {
            toast.error('An error occurred while updating photo albums.');
            throw error;
        }
    }

    return {
        managePhotoOnAlbum,
    };
}
