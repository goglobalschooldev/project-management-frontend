import * as React from "react";
import "./widgets.scss";
import Widget from "./Widget";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import { Grid } from "@mui/material";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { GET_TEAMS } from "../../../schema/team";
import { GET_USER_WITH_PAGINATION } from "../../../schema/users";
import { GET_ALL_PROJECTS } from "../../../schema/project";

const Widgets = () => {
  //
  const [keyword, setKeyword] = React.useState("");

  // GET Teams
  const [team, setTeam] = React.useState(0);
  const { data: teamData } = useQuery(GET_TEAMS, {
    variables: {
      keyword: keyword,
    },
  });
  React.useEffect(() => {
    if (teamData) {
      setTeam(teamData?.readTeams?.teams?.length);
    }
  }, [teamData]);
  // EndTeam

  // GET MEMBer
  const [member, setMember] = React.useState(0);
  const { data: memberData } = useQuery(GET_USER_WITH_PAGINATION, {
    variables: {
      keyword: keyword,
      pagination: false,
    },
  });
  React.useEffect(() => {
    if (memberData) {
      setMember(memberData?.readUsers?.users?.length);
    }
  }, [memberData]);
  // End Member

  // GET Project
  const [project, setProject] = React.useState(0);
  const [projectProgress, setProjectProgress] = React.useState(0);
  const { data: projectData } = useQuery(GET_ALL_PROJECTS, {
    variables: {
      keyword: keyword,
    },
  });
  React.useEffect(() => {
    if (projectData) {
      console.log(projectData, "projectData");
      setProject(
        projectData?.readProject?.filter((e) => e?.progress === 100).length
      );

      setProjectProgress(
        projectData?.readProject?.filter((e) => e?.progress !== 100).length
      );
    }
  }, [projectData]);
  // End Member

  return (
    // <div className="widgets">
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Widget
          color={"widget"}
          title="TEAMS"
          seeAll="See all teams"
          value={team}
          get_links={"/team"}
          icon={<GroupsIcon className="icon" />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Widget
          color={"widget-blue"}
          title="MEMBERS"
          seeAll="See all members"
          value={member}
          get_links={"/user"}
          icon={<PeopleIcon className="icon" />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Widget
          color={"widget"}
          title={`PROJECTS COMPLETE `}
          seeAll="See all"
          get_links={"/project"}
          value={project}
          icon={<WorkIcon className="icon" />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Widget
          color={"widget-blue"}
          title={`IN PROGRESS PROJECTS`}
          seeAll="See all"
          get_links={"/project"}
          value={projectProgress}
          icon={<WorkIcon className="icon" />}
        />
      </Grid>
    </Grid>
    // </div>
  );
};

export default Widgets;
