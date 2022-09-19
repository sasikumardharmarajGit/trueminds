import { useContext, useState, useEffect, useLayoutEffect } from "react";
import { NumberContext } from "../route/routing";
import React from 'react'
import { useNavigate } from 'react-router-dom';

const InvestNow = (props) => {
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
    const [validate, SetValidation] = useState([{ id: '', valid: '' }]);

    useEffect(() => {
        let temp = [...validate];
        cart.map((item, index) => {
            if (index == 0) {
                temp[index].id = item.id;
                temp[index].valid = '';
            } else {
                temp.push({ id: item.id, valid: '' });
            }
        });
        SetValidation(temp);
    }, [cart.length]);
    const handleChange = (event, value, index) => {
        setValue(event.target.value);
        validationStatus(event.target.value, value, index)
    };
    const validationStatus = (value, values, index) => {
        let temp = [...validate]
        if (value < parseInt(values.minimumPurchaseAmount)) {
            temp[index].valid = 'amount min';
        } else if (value > parseInt(values.maximumPurchaseAmount)) {
            temp[index].valid = ('amount max')
        } else {
            temp[index].valid = ''
        }
        SetValidation(temp);
    }
    const [indexValue, setIndexValue] = useState([])

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
                                            onChange={(e) => handleChange(e, list, index)}
                                            className="form-control mt-2"
                                        />
                                    </form>
                                </div>
                                <div className="mt-2 fw-bold text-danger">
                                    {validate[index]?.valid === "amount min" ? `Min.Amount: ₹ ${parseInt(list.minimumPurchaseAmount)}` :
                                        validate[index]?.valid === "amount max" ? `Max.Amount: ₹ ${parseInt(list.maximumPurchaseAmount)}` : ""}
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