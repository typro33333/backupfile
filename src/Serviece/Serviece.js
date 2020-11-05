import axios from '../AxiosServer';
var UrlBase = "http://localhost:8000";

export const login = async (user) => {
    console.log(user);
	return await fetch(UrlBase + "/login/token",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body:user
		})
		.then(async res => {
		if(res.status === 401){
                const notifield = "Wrong password";
                return notifield;
            }
		else if(res.status === 200){
                const data = await res.json();
                sessionStorage.setItem('token',"Bearer "+ data.access_token);
				return data.access_token;
            }
        else if(res.status === 500){
            console.log('erro database');
            return 0;
            }
		})
}

// User 
export const users = async () => {
    return await axios
    .get('/users/executors',{
        headers:{
            "Authorization":sessionStorage.getItem('token'),
        }
    }).then(async res =>{
        console.log(res)
        if(res.status === 200){
            return await res.data;
        }
        return null;
    });
};

////////////////////////////////////////////////
//User
////////////////////////////////////////////////

//User/AllUsers
export const Alluser = async() => {
    return axios.get('/users/',{headers:{'Authorization':sessionStorage.getItem('token'),}
    }).then(res => {
        console.log(res)
        if(res.status === 200)
            return res.data;
        return false
    })
}

// User Detail
export const listShop_Unsign = async (id) => {
    try{
    return await axios
    .get('/users/'+ id +'/all-shop-not-asign',{
        headers:{
            "Authorization":sessionStorage.getItem('token'),
        }
    }).then(async res =>{
        if(res.status === 200){
            return await res.data;
        }
        return null;
    })}
    catch(error){
        return error
    }
};

//User
export const list_manager = async () => {
    try{
    return await axios
    .get('/users/managers',{
        headers:{
            "Authorization":sessionStorage.getItem('token'),
        }
    })
    .then(async res =>{
        if(res.status === 200){
            return await res.data
        }
        return null;
    })}
    catch(error){
        return error
    }
};

//User detail
export const user_profile = async(id) =>{
    try {
    return await axios
    .get('/users/'+ id ,{
        headers:{
            "Authorization":sessionStorage.getItem('token'),
        }
    }).then(async res =>{
        if(res.status === 200){
            return await res.data;
        }
        return null;
    })}
    catch(error){
        return error;
    }
}

//User Detail
export const user_shops = async(id) =>{
    try{
    return await axios
    .get('/users/'+ id +'/all-shop',{
        headers:{
            "Authorization":sessionStorage.getItem('token'),
        }
    }).then(async res =>{
        if(res.status === 200){
            const data = await res.data;
            if(data.length === 0){
                console.log(false);
                return false
            }
            return data;
        }
        else if(res.status === 404){
            console.log('User Indentified');
            return null;
        }
        return null
    })}
    catch(error){
        return error;
    }
}

//USers
export const add_executor = async(email) => {
    return await fetch
        ("http://localhost:8000/users/create_new_user",{
        method:'POST',
        headers:{
            "Authorization":sessionStorage.getItem('token')
        },
        body:JSON.stringify({
            user_name:email,
            role:'executor'
        })
    }).then(async res =>{
        if(res.status === 200){
            return email;
        }
        return null;
    })
}

//User Detail
export const add_many_shop_unSign = async(id,arr_shops) => {
    try{
    return await 
        fetch("http://localhost:8000/users/"+id+"/add-many-shop",{
        method:'POST',
        headers:{
            "Authorization":sessionStorage.getItem('token')
        },
        body:arr_shops
        })
        .then(async res =>{
            if(res.status === 200){
                return true;
            }
            return false;
        })
    }catch(error){
        console.log(error);
    }
}

//////////////////////////////////////////////////////////////////
//Shops
export const list_shops = async() =>{
    return await axios.get("/shop/",{
    headers:{
        "Authorization":sessionStorage.getItem('token'),
    }})
    .then(res =>{
        if(res.status === 200){
            return res.data;
        };
        return null
    })
}

//Shop/{shopID}
export const DetailShop = async(id) =>{
    return await axios.get('/shop/'+id,{
        headers:{
            "Authorization":sessionStorage.getItem('token'),
        }
    })
    .then(async res =>{
        if(res.status === 200){
            return await res.data
        }
        return false
    })
}

export const SimofShop = async(id) => {
    return await axios.get('/shop/'+id+'/all-sim',{
        headers:{
            "Authorization":sessionStorage.getItem('token'),
        }
    })
    .then(async res =>{
        if(res.status === 200){
            return await res.data
        }
        return false
    })
}

//Shop/{ShopId}/all-executors
export const ExecutorOfShop = async(id) =>{
    return await axios('/shop/'+id+'/all-executors',{
        headers:{
            "Authorization":sessionStorage.getItem('token'),
        }
    })
    .then(async res =>{
        if(res.status === 200){
            return await res.data
        }
        return false
    })
}

//Shop/{ShopId}/all-executors-not-shop
export const ExecutorNotShop = async(id) =>{
    return await axios('/shop/'+id+'/all-executors-not-shop',{
        headers:{
            "Authorization":sessionStorage.getItem('token'),
        }
    })
    .then(async res =>{
        if(res.status === 200){
            return await res.data
        }
        return false
    })
}

export const Add_many_executor_no_shop = async(id,arr_exenoshop) => {
    return await fetch
    ("http://localhost:8000/shop/"+id+"/add-many-executor",{
    method:'POST',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization":sessionStorage.getItem('token')
    },
    body:arr_exenoshop
    }).then(async res =>{
        if(res.status === 200){
            return true;
        }
        return false;
    });
}
//////////////////////////////////////////////////////////////////
export const getListChannel = () => {
    return  axios.get("/channel", {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
        }
    }).then(res => {
        return res.data
    })
}

export const getListManagerOfChannel =  (id) => {
    return axios.get("channel/" + id + "/all-manager", {
        headers:{
            "Authorization":sessionStorage.getItem('token'),
        }
    }).then(res => {
        return res.data
    })
}

export const getShopsOfChannel = (id) => {
    return axios.get("channel/" + id + "/shops", {
        headers:{
            "Authorization":sessionStorage.getItem('token'),
        }
    }).then(res => {
        return res.data
    })
}
/// Country

export const getAllCountries = () => {
    return axios.get("/country/",{
        headers:{
            'Authorization': sessionStorage.getItem('token')
        }
    }).then(async res => {
        console.log(res);
        if(res.status === 200){
            return res.data;
        }
        return null;
    })
}

export const getCountryDetails = (id) => {
    return axios.get("/country/" + id, {
        headers:{
            'Authorization': sessionStorage.getItem('token')
        }
    }).then(res => {
        if(res.status === 200) {
            return res.data
        }
        return null;
    })
}

export const getShopsOfCountry = (id) => {
    return axios.get("/country/" + id + "/all_shop", {
        headers:{
            'Authorization': sessionStorage.getItem('token')
        }
    }).then(res => {
        if(res.status === 200) {
            return res.data
        }
        return null;
    })
}
//////////////////////////////////////////////
//Sim

//Sim/{getAllsim}
export const getAllsim  = () => {
    return axios.get("/sim/",{
        headers:{"Authorization":sessionStorage.getItem('token')}
    }).then(res => {
        if(res.status === 200){
            return res.data;
        }
        else if (res.status === 401){
            return res.status;
        }
        else{
            return false;
        }
    });
}
//sim/{check_balance}
export const postcheckbalance = (number) =>{
    return axios.post("/sim/balance-manual",{
        body:JSON.stringify(number)
    }).then(res =>{
        if(res.ok)
            return true
        return false
    })
}


//Sim/{get raw message}
export const getRawsim = (number) =>{
    return axios.get("/sim/"+number+"/all-messages",{
    }).then(res =>{
        if(res.status === 200)
            return res.data;
        return false;
    })
}

//Sim/{Refesh}
export const getRefresh = () => {
    return axios.get("/sim/refresh-sim")
    .then(res => {
        if(res.status === 200)
            return true;
        return false;
    })
}

//Sim/Balance
export const getBalance = () => {
    return axios.get("/sim/balance-all")
    .then(res => {
        if(res.status === 200)
            return true;
        return false;
    })
}
//Sim/getRawmessage
export const getAllRawmessage = (number) => {
    return  axios.get("/sim/"+number+"/all-messages",{
        headers:{"Authorization":sessionStorage.getItem('token')}
    })
    .then(res =>{
        if(res.status === 200)
          return res.data
        return
    })
}

//Sim/get_All_Url_Of_Sim
export const getAllurlofsim = (number) => {
    return axios.get("/sim/"+number+"/url",{
        headers:{"Authorization":sessionStorage.getItem('token')}
    })
    .then(res => {
        if(res.status === 200)
            return res.data
        return
    })
}

//Sim/get_All_Url_Not_In_Sim
export const getAllurlNotInsim = async (number) => {
    return await axios.get("/sim/"+number+"/not_url",{
        headers:{"Authorization":sessionStorage.getItem('token')}
    })
    .then(res => {
        if(res.status === 200)
            return res.data
        return
    })
}

//Sim/post_asign_url_to_sim
export const postUrltosim = (newurl) => {
    return fetch("http://localhost:8000/url/asign-url-to-sim",{
        method:'POST',
        headers:{
            'Authorization': sessionStorage.getItem('token')
        },
        body:JSON.stringify(newurl)
    }).then(async res => {
        if(res.ok)
            return true
        else if (res.status === 502)
            console.log(await res.json())
    })
}

//Sim/Tag_number
export const gettagnumber = (number) =>{
    return axios.get("/sim_tag_user/"+number+"/user_tag",{
        headers:{
            'Authorization': sessionStorage.getItem('token')
        },
    }).then(async res =>{
        if(res.status === 200)
            return res.data;
        return false;
    })
}
//Sim/All_Tag
export const getallTag = (number) => {
    return axios.get("/tag/",{
        headers:{
            'Authorization': sessionStorage.getItem('token')
        },
    }).then(async res =>{
        if(res.status === 200)
            return res.data;
        return false;
    })
}

//Sim//{Sim_number}//Delete_Url
export const delete_Urls_Of_Sim = (url) => {
    return fetch("http://localhost:8000/url/delete-url-of-sim",{
        method:'POST',
        headers:{
            'Authorization': sessionStorage.getItem('token')
        },
        body:JSON.stringify(url)
    }).then(async res => {
        if(res.ok)
            return true
        else if (res.status === 502)
            console.log(await res.json())
    })
}

//Sim//{Sim_number}/All_tag
export const all_tag_of_sim = async(list_number) => {
    var tag =[];
    for(var i=0; i < list_number.length;i++){
        await axios("/sim/"+list_number[i]+"/all_tag",{
            headers:{
                'Authorization': sessionStorage.getItem('token')
            },
        }).then(async res =>{
            if(res.status === 200)
                await tag.push(res.data)
        });
    }
    return tag;
}

//Sim/{sim_number}/AddTag
export const add_Tag_for_Sim = (title,sim) => {
   return fetch("http://localhost:8000/sim/add_tag?tag_title="+title,{
       method:"POST",
       headers:{
        'Authorization': sessionStorage.getItem('token')
       },
       body:JSON.stringify(sim)
   }).then(res => {
       if(res.ok){
           return true;
       }
       return false;
   })
}

////////////////////////////////////////////////

//Url//getall
export const getallUrl = () => {
    return axios.get("/url/",{
        headers:{"Authorization":sessionStorage.getItem('token')}
    })
    .then(async(res) => {
        if(res.status === 200)
            return res.data;
        return false;
    });
};

//Url/{addnewurl}
export const addnewUrl = (newUrl) =>{
    return fetch('http://localhost:8000/url/add-new-url',{
        method:'POST',
        headers:{
            'Authorization': sessionStorage.getItem('token')
        },
        body: JSON.stringify([newUrl]),
    }).then(res => {
        console.log(res)
        if(res.ok)
            return true
        else if (res.status === 502)
            return res.json()
    })
}

//Url/{DeleteUrl}
export const deletedUrl = (lsReadyDelete) => {
    return fetch('http://localhost:8000/url/delete-url',{
        method:'POST',
        headers:{
            'Authorization': sessionStorage.getItem('token')
        },
        body:JSON.stringify(lsReadyDelete),
    }).then(async res => {
        if(res.ok)
            return true
        else if (res.status === 502){
            return await res.json();
        }   
    })
}