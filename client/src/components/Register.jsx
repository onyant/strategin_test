const Form=()=>{
   return( <from>
        <input type="email" placeholder="email" required/>
        <input type="password" name="" id="" placeholder="Password" required/>
        <input type="submit" value="Envoyer" />
    </from>)
    
}
function Register() {
    return(
        <div className="">
        <h1>Test Express si ca marche gg</h1>
        <Form />
        </div>
    )
}
export default Register;