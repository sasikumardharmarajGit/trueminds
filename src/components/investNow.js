import { useContext, useState } from "react";
import { NumberContext } from "../route/routing";

const InvestNow = () => {
    const { cart } = useContext(NumberContext);
    console.log(cart);
    // const [isTouched, setTouched] = useState(false)
    // const [inputValue, setInputValue] = useState("");
    // const [isValid, setValid] = useState(true)

    // const handleInput = e => {
    //     setInputValue(e.target.value)
    //     // validate(e.target.value)
    //     console.log(e.target.value)
    // }

    // // const validate = val => {
    // //     if (e.target.name) {

    // //     }
    // // }

    const min = 500;
    const max = 1000000;

    const [value, setValue] = useState('');

    const handleChange = event => {
        const value = Math.max(min, Math.min(max, Number(event.target.value)));
        setValue(value);
    };

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
                                            type="text"
                                            placeholder="Your fav number"
                                            value={value}
                                            onChange={handleChange}
                                        />
                                    </form>
                                </div>
                                <div className="mt-2">
                                    Min. Amount: {list.minimumPurchaseAmount}
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