export const routes = {
      // auth
      login: "/auth/login",
      forgetPassword: "/auth/forgetPassword",
      //dashboard
      dashboard: "/app/dashboard",
      // user
      users: "/app/users",
      addUser: "/app/users/add",
      userProfile: (id: string | number) => `/app/users/${id}`,
      // projects
      projects: "/app/projects",
      addProjects: "/app/projects/add",
      // participants
      participants: "/app/participants",
      addParticipants: "/app/participants/add",
      participantDetails: "/app/participants/participantDetail",
      // roles
      roles: "/app/roles",
      // contacts
      individualContact: "/app/contact/individual",
      addIndividualContact: "/app/contact/individual/add",
      organizationalContact: "/app/contact/organizational",
      addOrganizationalContact: "/app/contact/organizational/add",
}