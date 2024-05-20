export const routes = {
      // auth
      login: "/auth/login",
      forgetPassword: "/auth/forgetPassword",
      //dashboard
      dashboard: "/manjushree/dashboard",
      // user
      users: "/manjushree/members",
      class: "/manjushree/class",
      addClass: "/manjushree/class/add",
      addUser: "/manjushree/members/add",
      userProfile: (id: string | number) => `/manjushree/users/${id}`,
      // projects
      projects: "/manjushree/projects",
      addProjects: "/manjushree/projects/add",
      // participants
      participants: "/manjushree/participants",
      addParticipants: "/manjushree/participants/add",
      participantDetails: (id: number | string) => "/manjushree/participants/" + id,
      // settings
      roles: "/manjushree/roles",
      import: "/manjushree/settings/import",
      // contacts
      individualContact: "/manjushree/contact/individual",
      editIndividualContact: (id: string | number) => "/manjushree/contact/individual/" + id,
      editOrganizationalContact: (id: string | number) => "/manjushree/contact/organizational/" + id,
      addIndividualContact: "/manjushree/contact/individual/add",
      organizationalContact: "/manjushree/contact/organizational",
      addOrganizationalContact: "/manjushree/contact/organizational/add",
}