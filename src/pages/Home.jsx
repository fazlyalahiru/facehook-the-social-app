import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuthProvider";

export default function Home() {
    const { auth } = useAuth();
    console.log(auth, "auth from home");
    return (
        <>
            <Header />
            <>home</>
        </>
    );
}