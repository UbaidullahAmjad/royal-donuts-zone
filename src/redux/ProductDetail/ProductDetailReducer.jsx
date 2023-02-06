/* eslint-disable no-unused-vars */
import { ProductDetail_GET_DATA } from '../types';

const initialState = {
    productsDetailList: [],
    prodDetailCurrData: null,
    prod_slug: null,
    loading: true,
    isError: false,
    errorMessage: null
}

const ProductDetailReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ProductDetail_GET_DATA:
            const tempProductsDetailArr = state.productsDetailList;
            const currentProductDetail = payload.prodDetailCurrData;
            if (payload.isError == false) {
                if (payload.prod_slug != null) {
                    let tempImagesArray = [];
                    tempImagesArray.push({ image: currentProductDetail?.product.image ?? null, type: 0 });
                    const prodDetail = {
                        ...currentProductDetail,
                        allImages: tempImagesArray,
                        prod_slug: payload.prod_slug,
                        currentImage: { image: currentProductDetail?.product.image ?? null, type: 0 }
                    }

                    tempProductsDetailArr.push(prodDetail)
                }
            }
            return {
                ...state,
                productsDetailList: tempProductsDetailArr,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        default: {
            return state
        }
    }
}

export default ProductDetailReducer
