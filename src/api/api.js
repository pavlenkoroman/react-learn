const { default: Axios } = require("axios");

let instance = Axios.create({
    baseURL: 'https://front-test.beta.aviasales.ru/'
}
)

export const getSearchId = () => {
    return instance.get(`search`)
        .then(
            (response) => {
                return response.data.searchId
            }
        )
}

export const getTickets = (searchId) => {
    return instance.get(`tickets?searchId=${searchId}`)
        .then(
            (response) => {
                if (response.status === 200) {
                return response.data.tickets
            } else return response.status
            }
        )
}