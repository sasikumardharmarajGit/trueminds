import { useContext, useState } from "react";
import { NumberContext } from "../route/routing";
import React from 'react'
import { useNavigate } from 'react-router-dom';

const InvestNow = () => {
    const navigate = useNavigate();
    const { cart } = useContext(NumberContext);

    React.useEffect(() => {
        window.onbeforeunload = function () {
            if (cart.length === 0) {
                navigate("/");
            }
            return true;
        };
        return () => {
            window.onbeforeunload = null;
            console.log(cart, "useEffect")
            if (cart.length === 0) {
                navigate("/");
                window.location.reload(false);
            }
        };
    });

    const minimum = cart.map((k) => (k.minimumPurchaseAmount));
    const maximum = cart.map((k) => (k.maximumPurchaseAmount));

    const mini = minimum.map(str => {
        return Number(str);
    });
    const maxi = maximum.map(str => {
        return Number(str);
    });

    const min = mini[0]
    const max = maxi[0]

    const [value, setValue] = useState('');
    const [validate, SetValidation] = useState('')

    const handleChange = event => {
        setValue(event.target.value);
        validationStatus(event.target.value)
    };
    const validationStatus = (value) => {
        if (value < min) {
            SetValidation('amount min')
        } else if (value > max) {
            SetValidation('amount max')
        } else {
            SetValidation('')
        }
    }

    console.log(value)

    return (
        <>
            {cart.length > 0 &&
                cart.map((list, index) => {
                    return (
                        <div key={index} className="card mb-3 shadow-sm rounded">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div className="heading_text left_margin">{list.name}</div>
                                    <span className="bolder_text">Min.Amount: ₹ {list.minimumPurchaseAmount}</span>
                                </div>
                                <div className="left_margin">
                                    <small className='smaller_text'>{list.classification}</small>
                                    <span className="dot"></span>
                                    <small className='smaller_text'>{list.category}</small>
                                </div>
                                <div className="mt-3 text">Amount</div>
                                <div>
                                    <form>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            onChange={handleChange}
                                            className="form-control mt-2"
                                        />
                                    </form>
                                </div>
                                <div className="mt-2 fw-bold text-danger">
                                    {validate === "amount min" ? `Min. Amount: ₹ ${list.minimumPurchaseAmount}` :
                                        validate === "amount max" ? `Max. Amount: ₹ ${list.maximumPurchaseAmount}` : ""}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className="d-grid gap-2">
                <button className="btn btn-primary investbtn" type="button">Invest Now</button>
            </div>
        </>
    )
}

export default InvestNow;