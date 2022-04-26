const files = {
    reduxFiles: [


        {
            store: {
                content:
                    `import { createStore, applyMiddleware } from "redux"
        import logger from "redux-logger"
        import rootReducer from "./rootReducer.js"
        
        if (process.env.NODE_ENV === "development")
            middleware.push(logger)
        
        export const store = createStore(rootReducer, applyMiddleware(...middleware))
        `
            }
        },
        {
            rootReducer: {
                content:
                    `import { combineReducers } from "redux";

        const rootReducer = combineReducers({

        })

        export default rootReducer
        `
            }
        }],
    reducerFiles: [
         {
            content: (reducerName) => (
                `import { ${reducerName}Types } from "./${reducerName}.types"
            const INITAIL_STATE = {
    
    }

export const ${reducerName}Reducer = (state = INITAIL_STATE, {type,payload}) => {

    switch (type) {
        
        
        default:
            return state
    }
}`
            ),
            name:".reducer.js"
        },
        {
            content: (reducerName) => (
                `import { ${reducerName}Types } from './${reducerName}.types'`
            ),
            name:".action.js"

        },
        {
            content: (reducerName) => (
                `export const ${reducerName}Types = {

            }`
            ),
            name:".types.js"

        }
    ]
}

module.exports = files