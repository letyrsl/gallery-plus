import type { Album } from '@src/contexts/albums/models/album';

export interface Photo {
    id: string;
    title: string;
    imageId: string;
    albums: Album[];
}
