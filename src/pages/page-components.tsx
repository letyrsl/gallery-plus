import { Dialog, DialogClose, DialogTrigger } from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';

import ChevronLeftIcon from '@src/assets/icons/chevron-left.svg?react';
import ChevronRightIcon from '@src/assets/icons/chevron-right.svg?react';
import SearchIcon from '@src/assets/icons/search.svg?react';
import Alert from '@src/components/alert';
import Badge from '@src/components/badge';
import Button from '@src/components/button';
import ButtonIcon from '@src/components/button-icon';
import { DialogBody, DialogContent, DialogFooter, DialogHeader } from '@src/components/dialog';
import Divider from '@src/components/divider';
import ImagePreview from '@src/components/image-preview';
import InputCheckbox from '@src/components/input-checkbox';
import InputSingleFile from '@src/components/input-single-file';
import InputText from '@src/components/input-text';
import Text from '@src/components/text';

export default function PageComponents() {
    const form = useForm();
    const file = form.watch('file');
    const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

    return (
        <div className="grid gap-7 p-6">
            <div className="flex gap-3">
                <Button>Button</Button>
                <Button variant="secondary">Button</Button>
                <Button disabled>Button</Button>
                <Button handling>Loading</Button>
                <Button icon={ChevronRightIcon}>Próxima Imagem</Button>
                <Button variant="ghost" size="sm">
                    Button
                </Button>
                <Button variant="primary" size="sm">
                    Button
                </Button>
            </div>

            <div className="flex gap-3">
                <ButtonIcon icon={ChevronLeftIcon} />
                <ButtonIcon icon={ChevronRightIcon} variant="secondary" />
            </div>

            <div className="flex gap-3">
                <Badge>Todos</Badge>
                <Badge>Natureza</Badge>
                <Badge>Viagem</Badge>
                <Badge loading>Viagem</Badge>
                <Badge loading>Viagem</Badge>
                <Badge loading>Viagem</Badge>
            </div>

            <div>
                <Alert>
                    Tamanho máximo: 50MB
                    <br />
                    Você pode selecionar arquivos em PNG, JPG, JPEG ou WEBP
                </Alert>
            </div>

            <div>
                <Divider />
            </div>

            <div>
                <InputText placeholder="Buscar foto" icon={SearchIcon} />
            </div>

            <div>
                <InputCheckbox />
            </div>

            <div>
                <InputSingleFile
                    form={form}
                    allowedExtensions={['png', 'jpg', 'jpeg', 'webp']}
                    maxFileSizeInMB={50}
                    replaceBy={<ImagePreview src={fileSource} alt="Preview" />}
                    {...form.register('file')}
                />
            </div>

            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Abrir Modal</Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>Teste dialog</DialogHeader>
                        <DialogBody>
                            <Text as="div" className="mb-4">
                                Teste de conteudo do dialog
                            </Text>
                        </DialogBody>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="secondary">Cancelar</Button>
                            </DialogClose>

                            <Button>Adicionar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
