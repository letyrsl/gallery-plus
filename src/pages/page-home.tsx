import Container from "../components/container";
import PhotoWidget from "../contexts/photos/components/photo-widget";
import type { Photo } from "../contexts/photos/models/photo";

export default function PageHome() {
    return <>
        <Container>
            <div className="grid grid-cols-4 gap-9">
                <PhotoWidget photo={{ id: '123', title: 'Hello world', imageId: "portrait-tower.png", albums: [{ id: '321', title: 'Album 1' }, { id: '321', title: 'Album 1' }, { id: '321', title: 'Album 1' }] }} />
                <PhotoWidget photo={null as Photo} loading />
            </div>
        </Container>
    </>;
}