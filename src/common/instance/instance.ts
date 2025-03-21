import axios from 'axios'

const token = 'f5ac55c9-4610-4d8c-b1a9-9b4773d113bc'
const apiKey = '651eb87e-ff6f-4bbe-bf12-89a6c26ace63'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
    },
})