import { useParams } from "react-router";

export default function PagePhotoDetails() {
    const { id } = useParams();

    return <>
        Página detalhe da foto {id}
    </>;
}