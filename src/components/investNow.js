import { useContext, useState, useEffect } from "react";
import { NumberContext } from "../route/routing";
import React from 'react'
import { useNavigate } from 'react-router-dom';

const InvestNow = () => {
    const navigate = useNavigate();
    const { cart } = useContext(NumberContext);

    useEffect(() => {
        window.onbeforeunload = function () {
            if (cart.length === 0) {
                navigate("/");
            }
            return true;
        };
        return () => {
            window.onbeforeunload = null;
            if (cart.length === 0) {
                navigate("/");
                window.location.reload(false);
            }
        };
    });


    const [value, setValue] = useState('');
    const [validate, SetValidation] = useState('')

    const handleChange = (event, value) => {
        console.log(value);
        setValue(event.target.value);
        validationStatus(event.target.value, value)
    };
    const validationStatus = (value, values) => {
        if (value < parseInt(values.minimumPurchaseAmount)) {
            SetValidation('amount min')
        } else if (value > parseInt(values.maximumPurchaseAmount)) {
            SetValidation('amount max')
        } else {
            SetValidation('')
        }
    }

    const [indexValue, setIndexValue] = useState(false)

    useEffect(() => {
        if (cart[0].id) {
            setIndexValue(true)
        }
    })

    return (
        <>
            <h2 className="mb-3">Trueminds Invest Now</h2>
            {cart.length > 0 &&
                cart.map((list, index) => {
                    return (
                        <div key={index} className="card mb-3 shadow-sm rounded">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div className="heading_text left_margin">{list.name}</div>
                                    <span className="bolder_text">Min.Amount: ₹  {parseInt(list.minimumPurchaseAmount)}</span>
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
                                            onChange={(e) => handleChange(e, list)}
                                            className="form-control mt-2"
                                        />
                                    </form>
                                </div>
                                <div className="mt-2 fw-bold text-danger">
                                    {validate === "amount min" ? `Min.Amount: ₹ ${parseInt(list.minimumPurchaseAmount)}` :
                                        validate === "amount max" ? `Max.Amount: ₹ ${parseInt(list.maximumPurchaseAmount)}` : ""}
                                </div>

                            </div>
                        </div>
                    )
                })

            }
            <div className="text-end">
                <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">Add More</button>
            </div>
            <div className="d-grid gap-2 mt-3">
                <button className="btn btn-primary investbtn" type="button">Invest Now</button>
            </div>
        </>
    )
}

export default InvestNow;