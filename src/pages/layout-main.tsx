import { Outlet } from 'react-router';

import MainContent from '@src/components/main-content';
import MainHeader from '@src/components/main-header';

export default function LayoutMain() {
    return (
        <>
            <MainHeader className="mt-9" />

            <MainContent>
                <Outlet />
            </MainContent>
        </>
    );
}
