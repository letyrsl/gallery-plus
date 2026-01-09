import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import PhotosList from "../contexts/photos/components/photos-list";

export default function PageHome() {
    return <>
        <Container>
            <AlbumsFilter albums={[{ id: "1", title: "dasdsa" }]} className="mb-9" />
            <PhotosList photos={[]} />
        </Container>
    </>;
}