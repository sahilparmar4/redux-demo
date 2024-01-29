import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as ReduxAPI from "../src/store/user/userData";
import { SharedStateProvider } from "./components/SharedStateProvider";

function App() {
  const dispatch = useDispatch();
  const [uniqueZipCodes, setUniqueZipCodes] = useState([]);
  const [selectedZipCode, setSelectedZipCode] = useState("All");
  const [selectSortingMethod, setSelectedSortingMethod] = useState("none");
  const [name, setName] = useState("");

  const showUsers = ()=>{
    dispatch(ReduxAPI?.getUserData({}));
  }
  const data = useSelector((state) => state.userData.getUsers.data.data);

  console.log(data);

  const selectDistinctZip = ()=>{
    let tempArr = data?.map(obj => obj.address.zipcode).filter((value, index, self) => index === self.indexOf(value));
    setUniqueZipCodes(tempArr);
  }

  const filterValues = ()=>{
    let filteredValues = data;

    // Searching
    filteredValues = filteredValues?.filter((item) => item?.name?.toLowerCase().includes(name?.toLowerCase()));

    // Filter by zipcode
    if(selectedZipCode !== "All"){
      filteredValues = filteredValues?.filter((item)=> selectedZipCode === item?.address?.zipcode);
    }

    // Sorting
    if(selectSortingMethod === "desc"){
      filteredValues?.sort((a, b)=> b?.id - a?.id);
    }else{
      filteredValues?.sort((a, b) => a.id - b?.id);
    }

    return filteredValues;
  }

  const filteredData = filterValues();

  useEffect(()=>{
    showUsers();
    selectDistinctZip();
  }, [data]);

  return (
    <SharedStateProvider>
      
      <center>
        <h1 className="font-medium">Redux Demo for API integreation</h1>
        <h3 className="mt-5 font-medium">User Data</h3>
      </center>
        <div className='mt-1 mb-3 row'>
          <div className='col-4'>
            <input 
              type='text'
              className='mx-5 form-control'
              placeholder='Search by name'
              onChange={(e)=>setName(e.target.value)}
            />           
          </div>
          <div className='col-4'>
           <select className='ml-32 mt-1 border-0 cursor-pointer bg-gray-100 w-64 text-center h-8 rounded-lg' value={selectedZipCode} onChange={(e)=>setSelectedZipCode(e.target.value)}>
              <option value="All"> Select Zipcode </option>
              {
                uniqueZipCodes?.map((item, key)=>{
                  return(
                    <option key={key} value={item}>{item}</option>
                  )
                })
              }
           </select>
          </div>
          <div className='col-4'>
            <select className='ml-32 mt-1 border-0 cursor-pointer bg-gray-100 w-64 text-center h-8 rounded-lg'
              onChange={(e)=>setSelectedSortingMethod(e.target.value)}
            >
                <option value="none"> none </option>
                <option value="asc"> asc </option>
                <option value="desc"> desc </option>
            </select>
          </div>
        </div>
        <center>
        <table className="shadow-lg bg-white">
          <tr>
            <th className="bg-blue-100 border text-left px-8 py-4">Id</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Name</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Username</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Email</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Address</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Phone</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Website</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Company</th>
            
          </tr>
          {
            filteredData?.map((item)=>{
              return(
                <>
                  <tr key={item.id}>
                    <td className="border px-8 py-4">{item.id}</td>
                    <td className="border px-8 py-4">{item.name}</td>
                    <td className="border px-8 py-4">{item.username}</td>
                    <td className="border px-8 py-4">{item.email}</td>
                    <td className="border px-8 py-4">{item.address.street+", "+item.address.city+", "+item.address.zipcode}</td>
                    <td className="border px-8 py-4">{item.phone.split(" ")[0]}</td>
                    <td className="border px-8 py-4">{item.website}</td>
                    <td className="border px-8 py-4">{item.company.name}</td>
                  </tr>
                </>
              )
            })
          }
          
        </table>
      </center>
    </SharedStateProvider>
  );
}

export default App;
