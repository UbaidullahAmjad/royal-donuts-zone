/* eslint-disable no-unused-vars */
import { PageContent_GET_DATA, PageContent_SEO_GET_DATA } from '../types';

const initialState = {
    pagesContentList: [],
    pageContentData: null,
    page_url: null,
    loading: true,
    isError: false,
    errorMessage: null
}

const PageContentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PageContent_GET_DATA:
            const tempPagesContentArr = state.pagesContentList;
            const currentPageContent = payload.pageContentData;
            if (payload.isError == false) {
                if (payload.page_url != null && currentPageContent != null) {
                    const pageData = {
                        ...currentPageContent,
                        page_url: payload.page_url,
                    }
                    tempPagesContentArr.push(pageData)
                }
            }
            return {
                ...state,
                pagesContentList: tempPagesContentArr,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        default: {
            return state
        }
    }
}

export default PageContentReducer
