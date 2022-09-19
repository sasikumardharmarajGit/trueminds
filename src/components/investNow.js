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
            // console.log(cart, "useEffect")
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
        console.log(event.target.value)
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
                                    <h3>{list.name}</h3>
                                    <span>Min.Amount: {list.minimumPurchaseAmount}</span>
                                </div>
                                <div>
                                    <small>{list.classification}</small>
                                    <span className="dot"></span>
                                    <small>{list.category}</small>
                                    <span className="dot"></span>
                                    <small>{list.riskmeter}</small>
                                </div>
                                <div className="mt-3">Amount</div>
                                <div>
                                    <form>
                                        <input
                                            type="number"
                                            placeholder="Enter Your Amount"
                                            // value={value}
                                            onChange={handleChange}
                                        />
                                    </form>
                                </div>
                                <div className="mt-2 text-danger">
                                    {validate === "amount min" ? `Min. Amount:${list.minimumPurchaseAmount}` :
                                        validate === "amount max" ? `Max. Amount:${list.maximumPurchaseAmount}` : ""}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div class="d-grid gap-2">
                <button class="btn btn-primary" type="button">Invest Now</button>
            </div>
        </>
    )
}

export default InvestNow;