import { Users } from '../components/Users'
import {Appbar} from '../components/Appbar'
import {Balance} from '../components/Balance'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect,  useState } from 'react'

const Dashboard = ()=>{
    const Navigate = useNavigate()
    useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token == null) {
        Navigate('/signin') 
    }
    
    else{
         axios.get('http://localhost:3000/api/v1/user/isValid',{
            headers:{Authorization : 'Bearer '+ token}
        }).then((res)=>{
            if(res.status !=  202){
                Navigate('/signin') 
            }
        })

    }
})
    const [balance, setBalance]  = useState(0)
    {useEffect(()=>{
        const bal = async()=>{
        const token = localStorage.getItem('token')
        const response =await axios.get('http://localhost:3000/api/v1/account/balance',{
            headers: { 'Authorization': 'Bearer ' + token  }
        })
        setBalance(response.data.balance)}

        bal();
    },[])}

    return <div>
    <Appbar/>
    <div className="m-8">
        <Balance value={balance} ></Balance>
        <Users></Users>
    </div>
    </div>
}

export default Dashboard