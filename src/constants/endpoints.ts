export const baseUrl: string = process.env.baseUrl ?? "";

export const endpoints = {
  admin:{
    validate:"/admin/tenants/validate"
  },
  auth: {
    signIn: "/auth/sign-in",
    geMe: "/auth/me"
  },
  dropdowns: {
    contact: "/dropdown/contact",
    organizationalContact: "/dropdown/contact/organization",
  },
  projects: {
    add: "",
    getAll: "/project",
    update: ""
  },
  participants: {
    all: "/participants",
    add: "/participants",
    getById: (id: string | number) => '/participants/' + id,
    update: (id: string | number) => '/participants/' + id,
    deleteReference: (id: string | number) => '/participants/reference/' + id,
    health: {
      add: "/participant/health",
      getAll: (id: number | string) => "/participant/health?participant=" + id
    },
    documents: {
      add: "/participant/document",
      getAll: (id: number | string) => "/participant/document?participant=" + id,
      delete:(id:number|string)=>"/participant/document/"+id 
    },
    contact: {
      add: "/participant/contact",
      getAll: (id: string | number) => "/participant/contact?participant=" + id,
      delete:(id:number|string)=>"/participant/contact/"+id 
    },
    plan:{
      getPlan:(id:number|string)=> '/participant/plan?participant='+id,
      create:"/participant/plan",
      document:{
        getAll:'/participant/plan-document',
        create:"/participant/plan-document"
      }
    }
  },
  users:{
    getAll:"/users",
    add:"/users",
    getById:(id:string|number)=>"/users/"+id,
    update:(id:string|number)=>"/users/"+id,
    contact:{
      getAll:(id:string|number)=>"/user/contact?user="+id,
      add:"/user/contact",
      delete:(id:string|number)=>"/user/contact/"+id
    }
  },
  contact: {
    getById: (id: number | string) => "/contact/" + id,
    individual: {
      all: "/contact/individual",
      add: "/contact/individual",
      update: (id: number | string) => "/contact/individual"
    },
    organizational: {
      all: "/contact/organization",
      update: (id: number | string) => "/contact/organization/" + id,
      add: "/contact/organization",
    }
  }
}