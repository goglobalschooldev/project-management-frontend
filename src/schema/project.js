import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation Mutation($input: createProjectInput) {
    createProject(input: $input) {
      success
      message
    }
  }
`;

export const GET_ALL_PROJECTS = gql`
  query ReadProject {
    readProject {
      _id
      name
      description
      priority
      tasks {
        taskName
        percent
        responsiblePerson {
          _id
          firstName
          lastName
          gender
          mail
          hashPassword
          profilePicture
          profileSrc
          active
          updateAt
          createAt
        }
      }
      team {
        _id
        name
        description
        logo
        logoSrc
        leaders {
          _id
          firstName
          lastName
          gender
          mail
          hashPassword
          profilePicture
          profileSrc
          active
          updateAt
          createAt
        }
        members {
          _id
          firstName
          lastName
          gender
          mail
          hashPassword
          profilePicture
          profileSrc
          active
          updateAt
          createAt
        }
        createAt
        updateAt
      }
      members {
        _id
        firstName
        lastName
        gender
        mail
        hashPassword
        profilePicture
        profileSrc
        active
        updateAt
        createAt
      }
      leaders {
        _id
        firstName
        lastName
        gender
        mail
        hashPassword
        profilePicture
        profileSrc
        active
        updateAt
        createAt
      }
      progress
      completeBy {
        _id
        firstName
        lastName
        gender
        mail
        hashPassword
        profilePicture
        profileSrc
        active
        updateAt
        createAt
      }
      startDate
      dueDate
      createAt
      updateAt
    }
  }
`;

export const GET_PROJECT_WITH_PAGINATION = gql`
  query ReadProjectWithPaginate($keyword: String, $pagination: Boolean) {
    readProjectWithPaginate(keyword: $keyword, pagination: $pagination) {
      projects {
        _id
        name
        description
        priority
        tasks {
          taskName
          percent
          responsiblePerson {
            _id
            firstName
            lastName
            gender
            mail
            hashPassword
            profilePicture
            profileSrc
            active
            updateAt
            createAt
          }
        }
        team {
          _id
          name
          description
          logo
          logoSrc
          leaders {
            _id
            firstName
            lastName
            gender
            mail
            hashPassword
            profilePicture
            profileSrc
            active
            updateAt
            createAt
          }
          members {
            _id
            firstName
            lastName
            gender
            mail
            hashPassword
            profilePicture
            profileSrc
            active
            updateAt
            createAt
          }
          createAt
          updateAt
        }
        members {
          _id
          firstName
          lastName
          gender
          mail
          hashPassword
          profilePicture
          profileSrc
          active
          updateAt
          createAt
        }
        leaders {
          _id
          firstName
          lastName
          gender
          mail
          hashPassword
          profilePicture
          profileSrc
          active
          updateAt
          createAt
        }
        progress
        completeBy {
          _id
          firstName
          lastName
          gender
          mail
          hashPassword
          profilePicture
          profileSrc
          active
          updateAt
          createAt
        }
        startDate
        dueDate
        createAt
        updateAt
      }
    }
  }
`;
export const UPDATE_PROJECT = gql`
  mutation Mutation($input: updateProjectInput) {
    updateProject(input: $input) {
      success
      message
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(_id: $id) {
      success
      message
    }
  }
`;

export const CREATE_TASKS = gql`
  mutation CreateTask($input: createTaskInput) {
    createTask(input: $input) {
      success
      message
    }
  }
`;
