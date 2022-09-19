import Card from '../components/card';
import Dummy from "../data/dummy"

const Home = () => {
    const data = Dummy
    return (
        <>
            <Card data={data} />
        </>
    )
}

export default Home;