import Container from '@src/components/container';
import AlbumsFilter from '@src/contexts/albums/components/albums-filter';
import useAlbums from '@src/contexts/albums/hooks/use-albums';
import PhotosList from '@src/contexts/photos/components/photos-list';
import usePhotos from '@src/contexts/photos/hooks/use-photos';

export default function PageHome() {
    const { albums, isLoadingAlbums } = useAlbums();
    const { photos, isLoadingPhotos } = usePhotos();

    return (
        <Container>
            <AlbumsFilter albums={albums} loading={isLoadingAlbums} className="mb-9" />
            <PhotosList photos={photos} loading={isLoadingPhotos} />
        </Container>
    );
}
