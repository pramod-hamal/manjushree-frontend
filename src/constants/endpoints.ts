export const baseUrl:string = "https://scbe.leanq.digital";

export const endpoints={
  auth:{
    signIn:"/auth/sign-in",
    geMe:"/auth/me"
  },
  projects:{
    add :"",
    all :"",
    update:""    
  },
  participants:{
    all :(limit:number)=>`/participants?limit=${limit}`,
    add :"/participants",
    update :""
  },
  contact:{
    individual:{
      add : "",
      all : "",
      update : ""
    },
    organizational:{
      add:"",
      all:"",
      update:""
    }
  }
}