
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';



export default function Searchbar({onSearch}) {
    const [inputValue, setInputValue] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(inputValue);
    }

    return (
        <form className='w-1/2 h-[6%] flex items-center' 
              onSubmit={handleSearch}
        >
            <input
                className="w-full h-full border border-2 rounded-xl p-4"
                type="text"
                value={inputValue}
                onChange={(e) => {setInputValue(e.target.value)}}
                placeholder="search a country"
            >
            </input>
           <button className='' type="submit">
                <FaSearch size={30} color='#76ABAE' onClick={handleSearch}/>
           </button>  
        </form>
    )
}