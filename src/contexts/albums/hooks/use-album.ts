import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import usePhotoAlbums from '@src/contexts/photos/hooks/use-photo-albums';
import usePhotos from '@src/contexts/photos/hooks/use-photos';
import { api } from '@src/helpers/api';

import type { Album } from '@src/contexts/albums/models/album';
import type { AlbumNewFormSchema } from '@src/contexts/albums/schemas';

export default function useAlbum() {
    const queryClient = useQueryClient();
    const { photos } = usePhotos();
    const { managePhotoOnAlbum } = usePhotoAlbums();

    async function createAlbum(payload: AlbumNewFormSchema) {
        try {
            const { data: album } = await api.post<Album>('/albums', {
                title: payload.title,
            });

            if (payload.photosIds && payload.photosIds.length > 0) {
                await Promise.all(
                    payload.photosIds.map((photoId) => {
                        const photoAlbumsIds =
                            photos
                                .find((photo) => photo.id === photoId)
                                ?.albums?.map((album) => album.id) || [];

                        return managePhotoOnAlbum(photoId, [...photoAlbumsIds, album.id]);
                    }),
                );
            }

            queryClient.invalidateQueries({ queryKey: ['albums'] });
            queryClient.invalidateQueries({ queryKey: ['photos'] });

            toast.success('Album created successfully.');
        } catch (error) {
            toast.error('Failed to create album.');
            throw error;
        }
    }

    return {
        createAlbum,
    };
}
