import { Users } from '../components/Users'
import {Appbar} from '../components/Appbar'
import {Balance} from '../components/Balance'
import axios from 'axios'
const Dashboard = ()=>{
    return <div>
    <Appbar/>
    <div className="m-8">
        <Balance value={async()=>{
            const response =await axios.get('http://localhost:3000/api/v1/account/balance')
            return response.data.balance
        }} ></Balance>
        <Users></Users>
    </div>
    </div>
}

export default Dashboard