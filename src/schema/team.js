import { gql } from "@apollo/client";

export const GET_TEAMS = gql`
  query ReadTeams($keyword: String) {
    readTeams(keyword: $keyword) {
      teams {
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
    }
  }
`;

export const CREATE_TEAM = gql`
  mutation CreateTeam($input: CreateTeamInput) {
    createTeam(input: $input) {
      success
      message
      teamData {
        _id
        name
        description
        logo
        logoSrc
        leaders {
          _id
          firstName
          lastName
          profileSrc
        }
        members {
          _id
          firstName
          lastName
          profileSrc
        }
        createAt
        updateAt
      }
    }
  }
`;

export const GET_TEAM_BY_ID = gql`
  query Query($id: ID!) {
    readTeamById(_id: $id) {
      _id
      name
      description
      logo
      logoSrc
      leaders {
        _id
        firstName
        lastName
      }
      members {
        _id
        firstName
        lastName
      }
      createAt
      updateAt
    }
  }
`;

export const DELETE_TEAM = gql`
  mutation DeleteTeam($id: ID!) {
    deleteTeam(_id: $id) {
      success
      message
    }
  }
`;

export const UPDATE_TEAM = gql`
  mutation Mutation($input: UpdateTeamInput) {
    updateTeam(input: $input) {
      success
      message
    }
  }
`;
