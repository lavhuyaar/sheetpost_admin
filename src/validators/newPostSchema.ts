import * as yup from "yup";

const newPostSchema = yup
  .object({
    title: yup
      .string()
      .required("Please add a title")
      .test(
        "length",
        "Title must be between 2 and 100 characters",
        (value: string) => {
          return (
            typeof value === "string" &&
            value.trim().length > 1 &&
            value.trim().length <= 100
          );
        }
      ),
    content: yup
      .string()
      .required("Please write the main content")
      .test(
        "length",
        "Main content must be between 2 and 8000 characters",
        (value: string) => {
          return (
            typeof value === "string" &&
            value.trim().length > 1 &&
            value.trim().length <= 8000
          );
        }
      ),
    isPublished: yup.boolean().required("Please select the visibility"),
  })
  .required();

export default newPostSchema;
