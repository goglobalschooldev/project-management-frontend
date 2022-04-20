import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation Mutation($input: createTaskInput) {
    createTask(input: $input) {
      success
      message
      taskData {
        _id
        taskName
        percent
        responsiblePerson {
          _id
          firstName
          lastName
        }
        project {
          _id
          name
        }
        updateAt
        createAt
      }
    }
  }
`;
