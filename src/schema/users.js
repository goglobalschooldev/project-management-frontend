import { gql } from "@apollo/client";

export const GET_USER_WITH_PAGINATION = gql`
  query ReadUsers($page: Int, $limit: Int, $keyword: String) {
    readUsers(page: $page, limit: $limit, keyword: $keyword) {
      paginator {
        slNo
        prev
        next
        perPage
        totalPosts
        totalPages
        currentPage
        hasPrevPage
        hasNextPage
        totalDocs
      }
      users {
        _id
        firstName
        lastName
        gender
        mail
        hashPassword
        profilePicture
        profileSrc
        updateAt
        createAt
        active
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation Mutation($input: CreateUserInput) {
    createUser(input: $input) {
      success
      message
      userData {
        _id
        firstName
        lastName
        gender
        hashPassword
        profilePicture
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation($input: UpdateUserInput) {
    updateUser(input: $input) {
      success
      message
      userData {
        _id
        firstName
        lastName
        gender
        mail
        hashPassword
        profilePicture
        profileSrc
        updateAt
        createAt
        active
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(_id: $id) {
      success
      message
    }
  }
`;
