import { Heading } from '../components/Heading'
import { Subheading } from '../components/Subheading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import axios from 'axios'

const Signup = () => {
    const Navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")
    const [password, setPassword] = useState("")
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"}></Heading>
                <Subheading label={"Enter your information to create an account"}></Subheading>
                <InputBox placeholder={"Kushal"} label={"First Name"} onChange={(e) => { setFirstname(e.target.value) }}></InputBox>
                <InputBox placeholder={"Chaudhary"} label={"Last Name"} onChange={(e) => { setLastname(e.target.value) }}></InputBox>
                <InputBox placeholder={"kushalchaudhary052@gmail.com"} label={"Email"} onChange={(e) => { setUsername(e.target.value) }}></InputBox>
                <InputBox placeholder={"l1j2h3g4"} label={"Password"} onChange={(e) => { setPassword(e.target.value) }}></InputBox>
                <div className='pt-4'>
                    <Button label={"Sign up"} onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            username :username,
                            firstName : firstName,
                            lastName: lastName,
                            password: password
                        })
                        localStorage.setItem('token', response.data.token)
                        Navigate('/dashboard')
                    }}> </Button>
                </div>
                <BottomWarning label={"Already have an account ?"} buttonText={"Sign in"} to={'/signin'}></BottomWarning>
            </div>
        </div>
    </div>
}
export default Signup;