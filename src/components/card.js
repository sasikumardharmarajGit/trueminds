import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NumberContext } from '../route/routing';

const Card = (props) => {
    const { cart, setCart } = useContext(NumberContext)
    const navigate = useNavigate();
    const cardData = props.data;
    const test = (value) => {
        let temp = [...cart];
        if (cart.length > 0) {
            let tem = temp.filter(item => item.id == value.id);
            if (tem.length > 0) {
            } else {
                temp.push(value);
            }
        } else {
            temp.push(value);
        }
        setCart(temp);
        navigate("/invest");
    }
    return (
        <>
            {cardData.map((i, id) => (
                <div className="card mb-3 shadow-sm rounded" key={id} onClick={() => {
                    test(i)
                }}>
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <div className="">
                            {i.name}
                            <div>
                                <small>{i.classification}</small>
                                <span className="dot"></span>
                                <small>{i.category}</small>
                                <span className="dot"></span>
                                <small>{i.riskmeter}</small>
                            </div>
                        </div>
                        <div>
                            <button type="button" className="btn btn-outline-primary">Invest Now </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Card;