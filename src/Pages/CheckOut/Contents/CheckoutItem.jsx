/* eslint-disable no-unused-vars */
import "../checkOut.css";
import { Button } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CheckoutItem = (props) => {
    return (
        <div className="checkout__item">
            <div className="checkout__item_image">
                <img className="img-fluid" src={`${process.env.PUBLIC_URL}/images/insta_1.png`} alt={`insta_1.png`} />
            </div>
            <div className="checkout__item_info">
                <div>
                    <p className="checkout__item_name">Caramel Cool Flash</p>
                    <p className="checkout__item_price">350</p>
                </div>
                <Button className="checkout__item_remove_btn mt-auto">
                    <DeleteOutlineIcon className="ico" />
                    <span>Remove</span>
                </Button>
            </div>
            <div className="checkout__item_add"></div>
        </div>
    )
}

export default CheckoutItem