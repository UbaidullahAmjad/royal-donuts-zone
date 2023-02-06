/* eslint-disable no-unused-vars */
import {
    ASSOCIATE_RULES_LIST,
    ASSOCIATE_RULE_DELETE,
    ASSOCIATE_RULE_CREATE,
    ASSOCIATE_RULE_EDIT,
} from "../../../actionTypes";

const initialState = {
    associateRulesList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const AssociateRulesReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ASSOCIATE_RULES_LIST: {
            let allAssociateRules = [];
            if (payload.response != null) {
                if (payload.isError == false) {
                    allAssociateRules = payload.response.associate;
                    allAssociateRules.map((item, index) => (item["index"] = index + 1));
                } else {
                    allAssociateRules = state.associateRulesList;
                }
                state.tempArrLength = allAssociateRules.length;
            }
            return {
                ...state,
                associateRulesList: allAssociateRules,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case ASSOCIATE_RULE_DELETE: {
            let deleted_rule = state.associateRulesList
            if (payload.prodId) {
                if (state.associateRulesList.length > 0 && payload.isError == false) {
                    deleted_rule = state.associateRulesList.filter((item) => item.id != payload.prodId);
                    deleted_rule.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                associateRulesList: deleted_rule,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case ASSOCIATE_RULE_CREATE: {
            let newTempArrLength = state.associateRulesList.length;
            newTempArrLength = newTempArrLength + 1;
            return {
                ...state,
                associateRulesList: state.associateRulesList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case ASSOCIATE_RULE_EDIT: {
            let newTempArrLength = state.associateRulesList.length;
            if (state.associateRulesList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                associateRulesList: state.associateRulesList,
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

export default AssociateRulesReducer;