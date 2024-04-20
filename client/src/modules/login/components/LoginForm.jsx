import React, { useEffect, useState } from 'react'
import axios from '../../../core/api/api';

const LoginForm = () => {

    const [first, setfirst] = useState()
    const firstList = [
        {
            id: 1,
            username: 'admin',
            password: 'admin'
        },
        {
            id: 2,
            username: 'admin',
            password: 'admin'
        },
        {
            id: 3,
            username: 'admin',
            password: 'admin'
        }
    ]

    const fire = () => {
        axios.post('/login', { username: 'admin', password: 'admin' }).then((response) => {
            console.log(response)
            setfirst(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    axios.put(`/lab/${2}`, { username: 'admin', password: 'admin' }, { params: 1 }).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })

    axios.delete(`/lab/${2}`).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })

    axios.get('/login').then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })

    useEffect(() => {
        fire()
    }, [])

    return (
        <div>{firstList.map((el) => {
            return (
                <>
                    <div key={el.id}>{el.username}</div>
                    <div key={el.id}>{el.password}</div>
                </>
            )
        })}</div>
    )
}

export default LoginForm