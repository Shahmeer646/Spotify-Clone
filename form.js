const data = {username:"" ,email:"" , password:""}

const sign_up = async() => {
 
    let res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(data)
    })
    res = await res.json()
    if (res.success == true) {
        localStorage.setItem('sign', 1)
    }
    else {
        setError('email', { message: 'This email has already an account' })
    }
    console.log('res')

}
const onChange = (e) => {
  // let data
  // let a = { data, [e.name]: e.value }
  if(e.name == 'username'){
    data.username = e.value
  }
  else if (e.name == 'email'){
    data.email = e.value
  }
  else{
    data.password = e.value
  }
     
}


const login = async (data) => {
    console.log(data)
    let res = await fetch("http://localhost:3000/", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(data)
    })
    res = await res.json()
    if (res.success == true) {
      if (res.user[0].password == data.password) {
        dispatch(increment())
        console.log()
        localStorage.setItem('login', 1)
        localStorage.setItem('email', JSON.stringify(res.user[0]))
        window.scrollTo(0,0)
        console.log(login)
      }

      else {
        setError('password', { message: "You enter wrong password" })
      }
      // console.log(res.user[0].password == data.password)
    }
    else {
      setError("email", { message: "This email has no account!" })
    }
    console.log(res)

  }

const delete_account = async () => {

    console.log('call')
    let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(data)
    })
    res = await res.json()
    log_out()
    console.log(res)
}

const log_out = () => {
  
    localStorage.setItem('login', 0)
    navigate('/')
    window.scrollTo(0, 0)
}