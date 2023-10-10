export const routes = {
      // auth
      login: "/auth/login",
      forgetPassword: "/auth/forgetPassword",
      //dashboard
      dashboard: "/support-coordinator/dashboard",
      // user
      users: "/support-coordinator/users",
      addUser: "/support-coordinator/users/add",
      userProfile: (id: string | number) => `/support-coordinator/users/${id}`,
      // projects
      projects: "/support-coordinator/projects",
      addProjects: "/support-coordinator/projects/add",
      // participants
      participants: "/support-coordinator/participants",
      addParticipants: "/support-coordinator/participants/add",
      participantDetails: (id: number | string) => "/support-coordinator/participants/" + id,
      // roles
      roles: "/support-coordinator/roles",
      // contacts
      individualContact: "/support-coordinator/contact/individual",
      editIndividualContact: (id: string | number) => "/support-coordinator/contact/individual/" + id,
      editOrganizationalContact: (id: string | number) => "/support-coordinator/contact/organizational/" + id,
      addIndividualContact: "/support-coordinator/contact/individual/add",
      organizationalContact: "/support-coordinator/contact/organizational",
      addOrganizationalContact: "/support-coordinator/contact/organizational/add",
}