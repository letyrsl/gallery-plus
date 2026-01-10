import React, { useState, useTransition, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Alert from '@src/components/alert';
import Button from '@src/components/button';
import {
    Dialog,
    DialogBody,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from '@src/components/dialog';
import ImagePreview from '@src/components/image-preview';
import InputSingleFile from '@src/components/input-single-file';
import InputText from '@src/components/input-text';
import Skeleton from '@src/components/skeleton';
import Text from '@src/components/text';
import useAlbums from '@src/contexts/albums/hooks/use-albums';
import usePhoto from '@src/contexts/photos/hooks/use-photo';
import { photoNewFormSchema, type PhotoNewFormSchema } from '@src/contexts/photos/schemas';

interface PhotoNewDialogProps {
    trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const { createPhoto } = usePhoto();
    const [isCreatingPhoto, setIsCreatingPhoto] = useTransition();

    const form = useForm<PhotoNewFormSchema>({
        resolver: zodResolver(photoNewFormSchema),
    });

    const { albums, isLoadingAlbums } = useAlbums();

    const file = form.watch('file');
    const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

    const albumsIds = form.watch('albumsIds');

    useEffect(() => {
        if (!modalOpen) {
            form.reset();
        }
    }, [modalOpen, form]);

    function handleToggleAlbum(albumId: string) {
        const albumsIds = form.getValues('albumsIds');
        const albumsSet = new Set(albumsIds || []);

        if (albumsSet.has(albumId)) {
            albumsSet.delete(albumId);
        } else {
            albumsSet.add(albumId);
        }

        form.setValue('albumsIds', Array.from(albumsSet));
    }

    function handleSubmit(payload: PhotoNewFormSchema) {
        setIsCreatingPhoto(async () => {
            await createPhoto(payload);
            setModalOpen(false);
        });
    }

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <DialogHeader>Add photo</DialogHeader>

                    <DialogBody className="flex flex-col gap-5">
                        <InputText
                            placeholder="Add a title"
                            maxLength={255}
                            error={form.formState.errors.title?.message}
                            {...form.register('title')}
                        />

                        <Alert>
                            Max size: 50MB
                            <br />
                            You can select PNG, JPG and JPEG files
                        </Alert>

                        <InputSingleFile
                            form={form}
                            allowedExtensions={['png', 'jpg', 'jpeg']}
                            maxFileSizeInMB={50}
                            replaceBy={<ImagePreview src={fileSource} className="w-full h-56" />}
                            error={form.formState.errors.file?.message}
                            {...form.register('file')}
                        />

                        <div className="space-y-3">
                            <Text variant="label-small">Select albums</Text>

                            <div className="flex flex-wrap gap-3">
                                {!isLoadingAlbums &&
                                    albums?.length > 0 &&
                                    albums.map((album) => (
                                        <Button
                                            key={album.id}
                                            variant={
                                                albumsIds?.includes(album.id) ? 'primary' : 'ghost'
                                            }
                                            size="sm"
                                            className="truncate"
                                            onClick={() => handleToggleAlbum(album.id)}
                                        >
                                            {album.title}
                                        </Button>
                                    ))}

                                {isLoadingAlbums &&
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <Skeleton
                                            key={`album-loading-${index}`}
                                            className="h-7 w-20"
                                        />
                                    ))}
                            </div>
                        </div>
                    </DialogBody>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="secondary" disabled={isCreatingPhoto}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={isCreatingPhoto} handling={isCreatingPhoto}>
                            {isCreatingPhoto ? 'Adding...' : 'Add'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
