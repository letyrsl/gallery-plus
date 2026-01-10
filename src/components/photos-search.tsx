import React, { useMemo, useState } from 'react';

import SearchIcon from '@src/assets/icons/search.svg?react';
import usePhotos from '@src/contexts/photos/hooks/use-photos';
import { debounce } from '@src/helpers/utils';

import InputText from './input-text';

export default function PhotosSearch() {
    const { filters } = usePhotos();
    const [inputValue, setInputValue] = useState(filters.q);

    const debouncedSetValue = useMemo(
        () =>
            debounce((value: string) => {
                filters.setQ(value);
            }, 200),
        [filters],
    );

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        setInputValue(value);
        debouncedSetValue(value);
    }

    return (
        <InputText
            icon={SearchIcon}
            placeholder="Search photos"
            className="flex-1"
            value={inputValue}
            onChange={handleInputChange}
        />
    );
}
