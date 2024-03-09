import React from 'react';
import './searchAdmin.css'
import 'primeicons/primeicons.css';

const SearchAdmin = () => {
    return (
        <div className='search-admin'>
            <div className='icon-search'><i className="pi pi-search"></i></div>
            <input type='text' placeholder='search'/>
        </div>
    );
}

export default SearchAdmin;
