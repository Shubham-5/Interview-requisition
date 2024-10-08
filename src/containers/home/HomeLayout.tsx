import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";
import { useData } from "./DataProvider";

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props}>
      {children}
    </Tab>
  );
};

const HomeLayout = () => {
  const { state } = useData()!;
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleRequisitionSubmit = () => {
    setCurrentTabIndex(1);
  };
  const handleJobDetailsSubmit = () => {
    setCurrentTabIndex(2);
  };
  const handleJobDetailsPrev = () => {
    setCurrentTabIndex(0);
  };
  const handlenterviewSettingsPrev = () => {
    setCurrentTabIndex(1);
  };
  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs isLazy index={currentTabIndex}>
          <TabList>
            <CustomTab>Requistion Details</CustomTab>
            <CustomTab isDisabled={!state.requisitionDetails.isComplete}>
              Job Details
            </CustomTab>
            <CustomTab isDisabled={!state.jobDetails.isComplete}>
              Interview Settings
            </CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm onNextTab={handleRequisitionSubmit} />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm
                  onNextTab={handleJobDetailsSubmit}
                  onPrevTab={handleJobDetailsPrev}
                />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm onPrevTab={handlenterviewSettingsPrev} />
              </TabPanel>
            </TabPanels>
            <DisplayCard />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
