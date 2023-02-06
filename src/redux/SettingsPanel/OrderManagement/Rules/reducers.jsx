/* eslint-disable no-unused-vars */
import {
    RULES_LIST,
    RULE_DELETE,
    RULE_CREATE,
    RULE_EDIT,
} from "../../../actionTypes";

const initialState = {
    supplierRulesList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const SupplierRulesReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case RULES_LIST: {
            let allSupplierRules = [];
            if (payload.response != null) {
                if (payload.isError == false) {
                    allSupplierRules = payload.response.rule;
                    allSupplierRules.map((item, index) => (item["index"] = index + 1));
                } else {
                    allSupplierRules = state.supplierRulesList;
                }
                state.tempArrLength = allSupplierRules.length;
            }
            return {
                ...state,
                supplierRulesList: allSupplierRules,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case RULE_DELETE: {
            let deleted_rule = state.supplierRulesList
            if (payload.prodId) {
                if (state.supplierRulesList.length > 0 && payload.isError == false) {
                    deleted_rule = state.supplierRulesList.filter((item) => item.id != payload.prodId);
                    deleted_rule.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                supplierRulesList: deleted_rule,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case RULE_CREATE: {
            let newTempArrLength = state.supplierRulesList.length;
            newTempArrLength = newTempArrLength + 1;
            return {
                ...state,
                supplierRulesList: state.supplierRulesList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case RULE_EDIT: {
            let newTempArrLength = state.supplierRulesList.length;
            if (state.supplierRulesList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                supplierRulesList: state.supplierRulesList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        default: {
            return state;
        }
    }
}

export default SupplierRulesReducer;