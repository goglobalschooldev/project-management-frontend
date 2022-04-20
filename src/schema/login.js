import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutation($input: Login) {
    login(input: $input) {
      success
      message
      userData {
        _id
        firstName
        lastName
        mail
        token
      }
    }
  }
`;
