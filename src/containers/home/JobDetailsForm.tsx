import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";
import { useData } from "./DataProvider";

type Props = {
  onNextTab: () => void;
  onPrevTab: () => void;
};

const JobDetailsForm = ({ onNextTab, onPrevTab }: Props) => {
  const { state, setState } = useData()!;

  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: state.jobDetails.jobTitle,
        jobDetails: state.jobDetails.jobDetails,
        jobLocation: state.jobDetails.jobLocation,
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
      }),
      onSubmit: (values) => {
        setState({
          requisitionDetails: {
            gender: state.requisitionDetails.gender,
            noOfOpenings: state.requisitionDetails.noOfOpenings,
            requisitionTitle: state.requisitionDetails.requisitionTitle,
            urgency: state.requisitionDetails.urgency,
            isComplete: state.requisitionDetails.isComplete,
          },
          jobDetails: {
            jobDetails: values.jobDetails,
            jobLocation: values.jobLocation,
            jobTitle: values.jobTitle,
            isComplete: true,
          },
          interviewSettings: {
            interviewDuration: state.interviewSettings.interviewDuration,
            interviewLanguage: state.interviewSettings.interviewLanguage,
            interviewMode: state.interviewSettings.interviewMode,
            isComplete: state.interviewSettings.isComplete,
          },
        });
        onNextTab();
      },
    });

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => onPrevTab()}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
