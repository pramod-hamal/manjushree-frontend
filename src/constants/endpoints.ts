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
    all :`/participants`,
    add :"/participants",
    getById:(id:string|number)=> '/participants/'+id,
    update:(id:string|number)=> '/participants/'+id,
    deleteReference:(id:string|number)=>'/participants/reference/'+id
  },
  contact:{
    add:"/contact",
    individual:{
      all : "/contact",
      getById:(id:number|string)=>"/contact/"+id,
      add:"",
      update : ""
    },
    organizational:{
      add:"",
      all:"",
      update:""
    }
  }
}