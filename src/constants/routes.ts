export const routes = {
      // auth
      login: "/auth/login",
      forgetPassword: "/auth/forgetPassword",
      //dashboard
      dashboard: "/dashboard",
      // user
      users: "/users",
      addUser: "/users/add",
      userProfile: (id: string | number) => `/users/${id}`,
      // projects
      projects: "/projects",
      addProjects: "/projects/add",
      // participants
      participants: "/participants",
      addParticipants: "/participants/add",
      participantDetails: (id:number|string)=>"/participants/"+id,
      // roles
      roles: "/roles",
      // contacts
      individualContact: "/contact/individual",
      addIndividualContact: "/contact/individual/add",
      organizationalContact: "/contact/organizational",
      addOrganizationalContact: "/contact/organizational/add",
}