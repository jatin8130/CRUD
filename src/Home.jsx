import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const Home = () => {

    const [user, setuser] = useState([])
    const [model, setmodel] = useState(false)
    const [detail, setdetail] = useState({
        name: '',
        email: '',
        phone: '',
        username: '',
        address: '',
        company: '',
        website: '',
    })
    const [edit, setedit] = useState(false)
    const [id, setid] = useState('')
    const [searchTerm, setSearchTerm] = useState('');

    //fetching api 
    const fetch = async () => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/users')
            if (!res.data.length) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Something wrong !',
                    timer: 3000
                })
            }

            setuser(res.data);
            console.log(res.data);


        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: 'Something wrong !',
                text: error
            })
        }
    }

    useEffect(() => {
        fetch();
    }, [])

    const handlechange = (e) => {
        const { name, value } = e.target

        setdetail({
            ...detail,
            [name]: value,
            username: `USER-${detail.name}`
        })
    }

    //Add user in api
    const addData = async (e) => {
        e.preventDefault()
        setedit(false)
        try {
            const res = await axios.post('https://jsonplaceholder.typicode.com/users', { detail })
            setuser([
                ...user,
                {
                    id: res.data.id,
                    name: res.data.detail.name,
                    email: res.data.detail.email,
                    phone: res.data.detail.phone,
                    username: res.data.detail.username,
                    address: res.data.detail.address,
                    company: res.data.detail.company,
                    website: res.data.detail.website,
                }
            ])
            setdetail({
                name: '',
                email: '',
                phone: '',
                username: '',
                address: '',
                company: '',
                website: '',
            })
            setmodel(!model);
            if (!res.data.detail) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Something wrong !',
                    timer: 3000
                })
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'User added successfully'
            })

        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: 'Something wrong !',
                text: error
            })
        }
    }

    const Deleted = (id) => {
        setuser((prevItems) => prevItems.filter(item => item.id !== id));
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User deleted successfully !'
        })
    }

    const edited = (item) => {
        setedit(true)
        setmodel(!model)
        setid(item.id)
        setdetail({
            name: item.name,
            email: item.email,
            phone: item.phone,
            username: item.username,
            address: item.address.city || item.address,
            company: item.company.name || item.company,
            website: item.website,
        })
    }

    console.log(user);


    console.log(id);


    const save = (e) => {
        e.preventDefault()
        const userdata = user.filter((item) => item.id !== id)
        setuser([
            ...userdata,
            {
                ...detail,
                id
            }
        ])
        setmodel(!model)
        setedit(false)
        setdetail({
            name: '',
            email: '',
            phone: '',
            username: '',
            address: '',
            company: '',
            website: '',
        })
        Swal.fire({
            icon: 'success',
            title: 'success',
            title: 'Updated successfully !',
            timer: 3000
        })
    }

    // Function to get sorted items
    const filteredItems = () => {
        const data = [...user].sort((a, b) => a.id - b.id);
        return data.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
    };

    if (!user.length) {
        return (
            <div className='flex justify-center items-center h-[100vh] w-[100%]'>
                <img src='/img/loader.gif' alt='...' />
            </div>
        )
    }

    console.log(detail);
    

    return (
        <div className='p-2'>
            <h1 className='sm:text-2xl text-xl text-center m-4 font-semibold'>User <span className='text-blue-600'>details</span></h1>

            <dialog open={model} className='p-3  sm:w-[50%] w-[100%] shadow-xl rounded-xl'>
                <form className='flex flex-col gap-3' onSubmit={edit ? save : addData}>
                    <label className='font-semibold'>Name</label>
                    <input onChange={handlechange} name='name' value={detail.name} className='p-2 bg-zinc-200 rounded-lg' type='text' minLength='3' required placeholder='enter your name' />
                    <label className='font-semibold'>Email</label>
                    <input onChange={handlechange} name='email' value={detail.email} className='p-2 bg-zinc-200 rounded-lg' type='emial' required placeholder='enter your email' />
                    <label className='font-semibold'>Phone</label>
                    <input onChange={handlechange} name='phone' value={detail.phone} className='p-2 bg-zinc-200 rounded-lg' type='number' min="9" placeholder='enter your mobile no.' />
                    <label className='font-semibold'>Username</label>
                    <input onChange={handlechange} name='username' value={detail.username} className='p-2 bg-zinc-200 rounded-lg' readOnly type='text' placeholder='enter your name' />
                    <label className='font-semibold'>Address</label>
                    <input onChange={handlechange} name='address' value={detail.address} className='p-2 bg-zinc-200 rounded-lg' type='text' required placeholder='enter your address' />
                    <label className='font-semibold'>Company name</label>
                    <input onChange={handlechange} name='company' value={detail.company} className='p-2 bg-zinc-200 rounded-lg' type='text' placeholder='enter your company name' />
                    <label className='font-semibold'>Website</label>
                    <input onChange={handlechange} name='website' value={detail.website} className='p-2 bg-zinc-200 rounded-lg' type='text' placeholder='enter your website url' />
                    <button className='bg-blue-500 p-2 text-white font-semibold'>{edit ? 'Save user' : 'Add user'}</button>
                </form>
            </dialog>

            <form>
                <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} className='sm:w-[50%] w-[100%] sm:p-3 p-2 bg-zinc-200 rounded-lg sm:mt-8' type='text' placeholder='Filter users' />
            </form>

            <button onClick={() => setmodel(!model)} className='bg-blue-600 hover:bg-blue-500 text-white p-2 rounded sm:text-xl text-base my-3'>+ Add User</button>

            <div className='overflow-x-auto'>
                <table className='w-[100%]'>
                    <thead>
                        <tr className='bg-zinc-500 text-white'>
                            <th className='p-3'>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                            <th>User detail</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            filteredItems().map((item, ind) => {
                                return (
                                    <tr key={ind} className='even:bg-zinc-200'>
                                        <td className='p-3 text-center font-semibold'>{item.name}</td>
                                        <td className='p-3 text-center'>{item.email}</td>
                                        <td className='p-3 text-center font-semibold'>{item.phone}</td>
                                        <td className='p-3 text-center flex gap-1'>
                                            <button onClick={() => edited(item)} className='bg-green-400 text-white py-1 px-2'>Edit</button>
                                            <button onClick={() => Deleted(item.id)} className='bg-red-400 text-white py-1 px-2'>Delete</button>
                                        </td>
                                        <td className='p-3 text-center text-slate-500 text-base'>
                                            <Link to={`/detail?item=${encodeURIComponent(JSON.stringify(item))}`}>More details</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home
