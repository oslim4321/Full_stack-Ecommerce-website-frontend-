import axios from "axios";

let TOKEN
const user = JSON.parse(localStorage.getItem('user'))

if (user) {
    TOKEN = user.token
}
console.log(TOKEN)

const tokenn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6IjYzNDQzODBiZWEwNWM0MDc1YzQwY2U4YSIsImlzQWRtaW4iOnRydWV9LCJpYXQiOjE2NjU0Mzg2NjIsImV4cCI6MTY2ODAzMDY2Mn0.krJUdaVpCEZAIsdYjwSzjbQX3xGL_O7i8xulBD5lB_c'

// const Base_Url = 'http://localhost:3453/api/v1/Ecommerce/'

// const Base_Url = 'https://react-node-ecommerce-oslim.herokuapp.com/'
const Base_Url = 'https://react-node-ecommerce-oslim.herokuapp.com/api/v1/Ecommerce/'

export const PublicRequest = axios.create({
    baseURL: Base_Url
})

export const UserRequest = axios.create({
    baseURL: Base_Url,
    headers: {
        token: `Bearer ${TOKEN}`,
    }
})