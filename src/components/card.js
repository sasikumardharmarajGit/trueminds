import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NumberContext } from '../route/routing';

const Card = (props) => {
    const { cart, setCart } = useContext(NumberContext)
    const navigate = useNavigate();
    const cardData = props.data;


    const test = (value = "") => {
        let temp = [...cart];
        if (cart.length > 0) {
            let tem = temp.filter(item => item.id === value.id);
            if (tem.length > 0) {
            } else {
                temp.push(value);
            }
        } else {
            temp.push(value);
        }
        setCart(temp);
        if (value !== "") { navigate("/invest"); }
    }
    return (
        <>
            {cardData.map((i, id) => (
                <div className="card mb-3 shadow-sm rounded border-0" key={id} onClick={() => { test(i) }}>
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <div className="heading_text">{i.name}</div>
                            <div>
                                <span className='smaller_text'>{i.classification}</span>
                                <span className="dot"></span>
                                <span className='smaller_text'>{i.category}</span>
                                <span className="dot"></span>
                                <span className='smaller_text'>{i.riskmeter}</span>
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