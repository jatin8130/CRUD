import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Detail = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const item = JSON.parse(decodeURIComponent(queryParams.get('item')));

  console.log(item);
  
  return (
    <div className='flex items-center justify-center w-[100%] h-[100vh] p-2'>
      <div className='bg-zinc-200 rounded-xl p-4 sm:text-xl text-lg font-semibold space-y-2'>
        <p>Name: {item.name}</p>
        <p>Email: {item.email}</p>
        <p>Phone: {item.phone}</p>
        <p>User name: {item.username}</p>
        <p>Address: {item.address.city || item.address}</p>
        <p>Address: {item.company.name || item.company}</p>
        <p className='pb-8'>Website: {item.website}</p>
        <Link className='p-3 bg-blue-500 text-white w-fit rounded-lg sm:text-lg text-base' to='/'>Back to home</Link>
      </div>
    </div>
  );
};

export default Detail;
