export const baseUrl:string = process.env.baseUrl ?? "";

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
    deleteReference:(id:string|number)=>'/participants/reference/'+id,
    health:{
      add:"/participant/health",
      getAll:(id:number|string)=>"/participant/health?participant="+id
    },
    documents:{
      add:"/participant/document",
      getAll:(id:number|string)=>"/participant/document?participant="+id
    },
    contact:{
      add:"/participant/contact",
      getAll:(id:string|number)=>"/participant/contact?participant="+id
    }
  },
  contact:{
    add:"/contact",
    individual:{
      all : "/contact/individual",
      getById:(id:number|string)=>"/contact/"+id,
      add:"/contact/individual",
      update:"/contact/individual",
    },
    organizational:{
      all:"/contact/organization",
      add:"",
      update:"/contact/organization"
    }
  }
}