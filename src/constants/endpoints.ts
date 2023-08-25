export const baseUrl: string = process.env.baseUrl ?? "";

export const endpoints = {
  auth: {
    signIn: "/auth/sign-in",
    geMe: "/auth/me"
  },
  dropdowns: {
    organizationalContact: "/dropdown/contact/organization",
  },
  projects: {
    add: "",
    all: "",
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
      getAll: (id: string | number) => "/participant/contact?participant=" + id
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