import React, { useTransition } from 'react';

import cx from 'classnames';

import Divider from '@src/components/divider';
import InputCheckbox from '@src/components/input-checkbox';
import Skeleton from '@src/components/skeleton';
import Text from '@src/components/text';
import usePhotoAlbums from '@src/contexts/photos/hooks/use-photo-albums';

import type { Album } from '@src/contexts/albums/models/album';
import type { Photo } from '@src/contexts/photos/models/photo';

interface AlbumsListSelectableProps extends React.ComponentProps<'ul'> {
    albums: Album[];
    photo: Photo;
    loading?: boolean;
}

export default function AlbumsListSelectable({
    albums,
    photo,
    loading,
    className,
    ...props
}: AlbumsListSelectableProps) {
    const { managePhotoOnAlbum } = usePhotoAlbums();
    const [isUpdatingPhoto, setIsUpdatingPhoto] = useTransition();

    function isChecked(albumId: string) {
        return photo?.albums?.some((album) => album.id === albumId);
    }

    async function handlePhotoOnAlbums(albumId: string) {
        let albumsId = [];

        if (isChecked(albumId)) {
            albumsId = photo.albums
                .filter((album) => album.id !== albumId)
                .map((album) => album.id);
        } else {
            albumsId = [...photo.albums.map((album) => album.id), albumId];
        }

        setIsUpdatingPhoto(async () => {
            await managePhotoOnAlbum(photo.id, albumsId);
        });
    }

    return (
        <ul className={cx('flex flex-col gap-4', className)} {...props}>
            {!loading &&
                photo &&
                albums?.length &&
                albums.map((album, index) => (
                    <li key={album.id}>
                        <div className="flex items-center justify-between gap-1">
                            <Text variant="paragraph-large" className="truncate">
                                {album.title}
                            </Text>
                            <InputCheckbox
                                defaultChecked={isChecked(album.id)}
                                onChange={() => handlePhotoOnAlbums(album.id)}
                                disabled={isUpdatingPhoto}
                            />
                        </div>
                        {index !== albums.length - 1 && <Divider className="mt-4" />}
                    </li>
                ))}

            {loading &&
                Array.from({ length: 5 }).map((_, index) => (
                    <li key={`albums-list-${index}`}>
                        <Skeleton className="h-[2.5rem]" />
                    </li>
                ))}
        </ul>
    );
}
