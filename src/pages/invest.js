import { useLocation } from 'react-router-dom';
import InvestNow from '../components/investNow';

const Home = () => {
    const location = useLocation();
    // console.log(location);
    return (
        <>
            <InvestNow data={location.state} />
        </>
    )
}

export default Home;