import React,{useState} from 'react'

export default function Search(props) {
  const [searchValue, setSearchValue] = useState("");

  // 改变input的值
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };
  
  // 清空input
  const resetInputField=()=>{
    setSearchValue("");

  }
  


  const callSearchFunction=(e)=>{
    e.preventDefault()
    props.search(searchValue)
    // 使用完清空input内容
    resetInputField();

  }

  return (
    <form className='search'>
      <input type="text" value={searchValue} onChange={handleSearchInputChanges} />
      <input type="submit" onClick={callSearchFunction} value='SEARCH' />
    </form>
  )
}
