import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { ConfigProvider, message, Table } from "antd";
import axios from "axios";
import Image2 from "../assets/Flood2.jpg";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { LinearProgress } from "@mui/material";
import { ModalForm, ProFormText, ProFormTextArea } from "@ant-design/pro-form";
import en_US from "antd/lib/locale/en_US";
class Dashboard extends React.Component {
  formRef = React.createRef();
  constructor() {
    super();
    this.state = {
      noOfNgos: [],
      activeNgos: 0,
      noOfvolunteers: [],
      activeVol: 0,
      signUpRequests: [],
      projectRequests: [],
      activeProjects: 0,
      user: window.localStorage.getItem("user"),
      tableRef: React.createRef(),
      currentNgoDetails: null,
      currentUserDetails: null,
      isModalVisible: false,
      isModalVisible2: false,
      certificateStatus: []
    };
  }
  componentDidMount() {
    this.fetchNgo();
    this.fetchVolunteer();
    this.fetchProjects();
  }
  fetchProjects = async () => {
    try{
      const projectsRes = await fetch("/getProjects", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!projectsRes.ok) {
        throw new Error(projectsRes.statusText);
      }
      const projectData = await projectsRes.json();
      if (projectData) {
        const activeProjects = projectData.filter(
          (project) => project.isActive == true
        );
        const inActiveProjects = projectData.filter(
          (project) => project.isActive == false
        );
        this.setState({
          projectRequests: inActiveProjects,
          activeProjects: activeProjects,
        });
      }
    }
    catch(error){
      console.log(error)
    }
  }
  fetchVolunteer = async () => {
    try {
      const volunteersRes = await fetch("/getVolunteers", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!volunteersRes.ok) {
        throw new Error(volunteersRes.statusText);
      }
      const volunteerData = await volunteersRes.json();
      if (volunteerData) {
        const inactiveVolunteers = volunteerData.filter(
          (volunteer) => volunteer.activeStatus === "false"
        );
        let currentuser = window.localStorage.getItem("email");
        currentuser = volunteerData.filter((vol) => vol.email === currentuser);
        const activeVols = volunteerData.filter(
          (vol) => vol.activeStatus === "true"
        );
        const certificateRequests = activeVols.filter(cer => cer.requestCertification == 1)
        console.log("activeVols", certificateRequests);
        this.setState({
          activeVol: activeVols,
          noOfvolunteers: inactiveVolunteers,
          currentUserDetails: currentuser,
          certificateStatus: certificateRequests
        });
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  fetchNgo = async () => {
    try {
      const ngoRes = await fetch("/getNGO", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!ngoRes.ok) {
        throw new Error(ngoRes.statusText);
      }
      const ngoData = await ngoRes.json();
      if (ngoData) {
        const activeNgo = ngoData.filter((ngo) => ngo.activeStatus === "true");
        const InactiveNgos = ngoData.filter(
          (ngo) => ngo.activeStatus === "false"
        );
        let currentNgo = window.localStorage.getItem("email");
        currentNgo = ngoData.filter((ngo) => ngo.email === currentNgo);
        this.setState({
          noOfNgos: InactiveNgos,
          currentNgoDetails: currentNgo,
          activeNgos: activeNgo,
        });
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  handleUpdate = async (endPoint, id) => {
    if (id) {
      try {
        const response = await axios.put(endPoint + `/${id}`, {
          activeStatus: true,
        });
        if (response.status === 200) {
          console.log("Updated Succesfully", response.data);
          this.reloadTable();
        } else {
          console.log("Not Updated");
        }
      } catch (error) {
        console.log("Failed to update");
      }
    }
  };
  handleUpdateProfile = async (endPoint, id, values) => {
    if (id) {
      try {
        const response = await fetch(endPoint + `/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (response.status === 200) {
          let email= await response.json();
          window.localStorage.setItem("email",email.email);
          message.success("Profile Updated Successfully");
          return true;
        } else {
          console.log("Not Updated");
        }
      } catch (error) {
        console.log("Failed to update");
      }
    }

    return false;
  };

  UpdateStatusProject = async (record) => {
    try {
      const response = await axios.put(`updateProject/${record._id}`, {
        isActive: true,
      });

      if (response.status === 200) {
        console.log("Updated Succesfully", response.data);
        this.reloadTable();
      } else {
        console.log();
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleDelete = async (endPoint, id) => {
    console.log("Id:", id);
    const response = await fetch(endPoint + `/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      message.success("Request Rejected successfully");
      this.reloadTable();
    } else {
      message.error("Failed to reject request");
    }
  };
  reloadTable = () => {
    this.fetchNgo();
    this.fetchVolunteer();
    this.fetchProjects();
    this.state.tableRef.current && this.state.tableRef.current.reload();
  };
  handleModalVisibleChange = (visible) => {
    this.setState({ isModalVisible: visible });
  };
  handleModalVisibleChange2 = (visible) => {
    this.setState({ isModalVisible2: visible });
  };
  UpdateRequestCertification = async (id, params) => {
    if (id) {
      try {
        const response = await axios.put("updateVolunteer" + `/${id}`, {
          requestCertification: params,
        });
        
        if (response.status === 200) {
          if (params == 1) {
            message.success("Request Sent Succesfully");
          }
          if (params == 2) {
            message.info("Accepted .. Kindly send Certificate to Volunteer");
          }
          if (params == 0) {
            message.info("Rejected ..");
          }
          this.reloadTable();
        } else {
          console.log("Not Updated");
        }
      } catch (error) {
        console.log("Failed to update");
      }
    }
  };
  render() {
    const ngoColumns = [
      {
        title: "Name",
        dataIndex: "ngoName",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Address",
        dataIndex: "address",
      },
      {
        title: "Phone",
        dataIndex: "phone",
      },
      {
        title: "Accept",
        dataIndex: "accept",
        render: (_, record) => {
          return (
            <Button onClick={() => this.handleUpdate("updateNGO", record._id)}>
              Accept
            </Button>
          );
        },
      },
      {
        title: "Reject",
        dataIndex: "reject",
        render: (_, record) => {
          return (
            <Button
              style={{ color: "red" }}
              onClick={() => {
                this.handleDelete("deleteNGO", record._id);
              }}
            >
              Reject
            </Button>
          );
        },
      },
    ];
    const volunteerColumns = [
      {
        title: "Name",
        dataIndex: "fullname",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Address",
        dataIndex: "address",
      },
      {
        title: "Phone",
        dataIndex: "phone",
      },
      {
        title: "Accept",
        dataIndex: "accept",
        render: (_, record) => {
          return (
            <Button
              onClick={() => this.handleUpdate("updateVolunteer", record._id)}
            >
              Accept
            </Button>
          );
        },
      },
      {
        title: "Reject",
        dataIndex: "reject",
        render: (_, record) => {
          return (
            <Button
              style={{ color: "red" }}
              onClick={() => {
                this.handleDelete("deleteVolunteer", record._id);
              }}
            >
              Reject
            </Button>
          );
        },
      },
    ];
    const projectcolumns = [
      {
        title: "NGO",
        dataIndex: "ngo",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        title: "Accept",
        dataIndex: "accept",
        render: (_, record) => {
          return (
            <Button onClick={() => this.UpdateStatusProject(record)}>
              Accept
            </Button>
          );
        },
      },
      {
        title: "Reject",
        dataIndex: "reject",
        render: (_, record) => {
          return (
            <Button
              style={{ color: "red" }}
              onClick={() => {
                this.handleDelete("deleteProject", record._id);
              }}
            >
              Reject
            </Button>
          );
        },
      },
    ];

    const certificateRequestColumns = [
      {
        title: "Volunteer Name",
        dataIndex: "fullname",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Accept and Upload ",
        dataIndex: "upload",
        render: (_, record) => {
          return (
            <Button onClick={() => this.UpdateRequestCertification(record._id, 2)}>
              Accept
            </Button>
          );
        },
      },
      {
        title: "Reject",
        dataIndex: "reject",
        render: (_, record) => {
          return (
            <Button
              style={{ color: "red" }}
              onClick={() => {
                this.UpdateRequestCertification(record._id, 0);
              }}
            >
              Reject
            </Button>
          );
        },
      },
    ];
    return (
      <div className="container">
        <Typography
          alignItems={"center"}
          variant={"h3"}
          color={"white"}
          textAlign={"left"}
          className="txt text-bold"
          padding={"10px"}
          fontFamily={"Roboto"}
        >
          Profile
        </Typography>

        {this.state.user && this.state.user === "Admin" && (
          <>
            <div className="row w-full flex flex-col md:flex-row md:justify-around md:items-center ">
              <div className="w-full md:w-1/2 p-3">
                <Card
                  sx={{
                    maxWidth: 345,
                    background: "#306c74",
                    borderRadius: "15px",
                  }}
                >
                  <CardContent>
                    <Typography
                      alignItems={"center"}
                      variant={"h4"}
                      color={"white"}
                      textAlign={"center"}
                      className="txt text-bold"
                    >
                      Volunteers
                    </Typography>
                    <Typography
                      alignItems={"center"}
                      variant={"h4"}
                      color={"white"}
                      textAlign={"center"}
                      className="txt text-bold my-20"
                    >
                      {this.state.activeVol ? this.state.activeVol.length : "0"}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <Card
                  sx={{
                    maxWidth: 345,
                    background: "#306c74",
                    borderRadius: "15px",
                  }}
                >
                  <CardContent>
                    <Typography
                      alignItems={"center"}
                      variant={"h4"}
                      color={"white"}
                      textAlign={"center"}
                      className="txt text-bold"
                    >
                      NGO's
                    </Typography>
                    <Typography
                      alignItems={"center"}
                      variant={"h4"}
                      color={"white"}
                      textAlign={"center"}
                      className="txt text-bold my-20"
                    >
                      {this.state.activeNgos
                        ? this.state.activeNgos.length
                        : "0"}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <Card
                  sx={{
                    maxWidth: 345,
                    background: "#306c74",
                    borderRadius: "15px",
                  }}
                >
                  <CardContent>
                    <Typography
                      alignItems={"center"}
                      variant={"h4"}
                      color={"white"}
                      textAlign={"center"}
                      className="txt text-bold"
                    >
                      Projects
                    </Typography>
                    <Typography
                      alignItems={"center"}
                      variant={"h4"}
                      color={"white"}
                      textAlign={"center"}
                      className="txt text-bold my-20"
                    >
                      {this.state.activeProjects
                        ? this.state.activeProjects.length
                        : "0"}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div>
              <div className="requests flex justify-around items-center w-full my-10">
                <div className="w-full md:w-1/2 ">
                  <Card style={{ borderRadius: "15px" }}>
                    <CardContent>
                      <div>
                        <div className="txt text-center font-bold">
                          <h1>Volunteer Join Requests</h1>
                        </div>
                        <Table
                          columns={volunteerColumns}
                          dataSource={this.state.noOfvolunteers}
                          size="middle"
                          pagination={{ defaultPageSize: 4 }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="w-full md:w-1/2 ml-5">
                  <Card style={{ borderRadius: "15px" }}>
                    <CardContent>
                      <div>
                        <div className="txt text-center font-bold">
                          <h1>Ngo Join Requests</h1>
                        </div>
                        <Table
                          ref={this.state.tableRef}
                          columns={ngoColumns}
                          dataSource={this.state.noOfNgos}
                          size="middle"
                          pagination={{ defaultPageSize: 4 }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="requests flex justify-around items-center w-full my-10">
                <div className="w-full md:w-1/2 ">
                  <Card style={{ borderRadius: "15px" }}>
                    <CardContent>
                      <div>
                        <div className="txt text-center font-bold">
                          <h1>Project Requests</h1>
                        </div>
                        <Table
                          columns={projectcolumns}
                          dataSource={this.state.projectRequests}
                          size="middle"
                          pagination={{ defaultPageSize: 4 }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}

        {this.state.user && this.state.user === "Volunteer" && (
          <>
            {this.state.currentUserDetails &&
              this.state.currentUserDetails != null && (
                <div className="container font-bold flex flex-row justify-center items-center">
                  <div className="container font-bold flex flex-col justify-center items-center w-1/2">
                    <div className="myproject py-2 ">
                      <h2 className="text-2xl mb-4 text-white">Project</h2>
                      <div
                        className="w-80 h-40 bg-white shadow-md rounded-lg p-3"
                        style={{
                          backgroundColor: "#6d9eaf",
                        }}
                      >
                        <h2 className="text text-center">Edhi Foundation</h2>
                        <div className="container flex flex-row items-center justify-around py-4">
                          <h4 className="bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow">
                            Ongoing
                          </h4>
                          <h4 className="bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow">
                            Completed
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="performance">
                      <h2 className="text-2xl mb-4 text-white">Performance</h2>
                      <div
                        className="w-100 h-40 bg-white shadow-md rounded-lg flex p-12 flex-col justify-around items-center py-5"
                        style={{
                          backgroundColor: "#6d9eaf",
                        }}
                      >
                        <div className="flex flex-row ">
                          <div>
                            <StarHalfIcon />
                          </div>
                          <div>
                            <div className="py">E-Certificate</div>
                            <LinearProgress size="large" />
                          </div>
                          <div>
                            <StarHalfIcon />
                          </div>
                        </div>
                        <div>
                          <Button
                            onClick={() => {
                              if (
                                this.state.currentUserDetails[0]
                                  .requestCertification == 0
                              )
                                this.UpdateRequestCertification(
                                  this.state.currentUserDetails[0]._id, 1
                                );
                              else {
                                message.error(
                                  "You have already requested for certification"
                                );
                              }
                            }}
                            variant="contained"
                            size="10"
                            color="primary"
                          >
                            Request
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container w-1/2">
                    <div className="profile mr-8">
                      <h2 className="text-2xl mb-4 text-white">
                        Personal Details
                      </h2>
                      <div
                        className="w-70 h-80 bg-white shadow-md rounded-lg p-3"
                        style={{ backgroundColor: "#6d9eaf" }}
                      >
                        <div className="flex flex-row justify-between py-2 ">
                          <h2 className="text text-left bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow">
                            Name:
                          </h2>
                          <p className="text text-right bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow">
                            {this.state.currentUserDetails[0].fullname}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between py-2">
                          <h2 className="text text-left bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow ">
                            Email:
                          </h2>
                          <p className="text text-right bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow">
                            {this.state.currentUserDetails[0].email}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between py-2">
                          <h2 className="text text-left bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow">
                            Phone:
                          </h2>
                          <p className="text text-right bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow">
                            {this.state.currentUserDetails[0].phone}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between py-2">
                          <h2 className="text text-left bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow">
                            Address:
                          </h2>
                          <p className="text text-right bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow">
                            {this.state.currentUserDetails[0].address}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between py-2">
                          <div className="text text-right bg-blue-300 text-gray-800 py-2 px-4 rounded-full shadow">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                this.setState({ isModalVisible: true })
                              }
                            >
                              Edit Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </>
        )}

        {this.state.user && this.state.user === "Ngo" && (
          <>
            {this.state.currentNgoDetails &&
              this.state.currentNgoDetails != null && (
                <div className="container flex flex-col items-center">
                  <div className="container font-bold pl-12  ">
                    <div className="profile mr-8">
                      <h2 className="text-2xl mb-4 text-white mr-5">
                        Personal Details
                      </h2>
                      <div
                        className="w-100 h-[7rem] bg-white shadow-md rounded-lg"
                        style={{ backgroundColor: "#6d9eaf" }}
                      >
                        <div className="flex flex-row py-2 text-white">
                          <div className="text flex flex-col w-1/4 px-5">
                            <div>Name</div>
                            <div className="py-7">
                              {this.state.currentNgoDetails[0].ngoName}
                            </div>
                          </div>

                          <div className="text flex flex-col w-1/4 px-5">
                            <div>Email</div>
                            <div className="py-7">
                              {this.state.currentNgoDetails[0].email}
                            </div>
                          </div>
                          <div className="text flex flex-col w-1/4 px-5">
                            <div>Phone</div>
                            <div className="py-7">
                              {this.state.currentNgoDetails[0].phone}
                            </div>
                          </div>
                          <div className="text flex flex-col w-1/4 px-5">
                            <div>Branches</div>
                            <div className="py-7">
                              {this.state.currentNgoDetails[0].branches}
                            </div>
                          </div>
                          <div className="text flex flex-col w-1/4 px-5">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                this.setState({ isModalVisible2: true })
                              }
                            >
                              Edit Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="requests flex justify-center items-center my-5">
                    <div className="w-full">
                      <Card style={{ borderRadius: "15px" }}>
                        <CardContent>
                          <div>
                            <div className="txt text-center font-bold">
                              <h1>Volunteer E-Certificate Requests</h1>
                            </div>
                            <Table
                              columns={certificateRequestColumns}
                              dataSource={this.state.certificateStatus}
                              size="middle"
                              pagination={{ defaultPageSize: 4 }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* second element  */}
                  <h1 className="py-5">
                    <span className="partner font-bold text-[#3be7e7] text-2xl md:text-4xl">
                      ONGOING
                    </span>
                    <span className="font-medium text-white text-xl md:text-4xl">
                      &nbsp; PROJECTS
                    </span>
                  </h1>
                  <div className="container w-full py-5 mx-20 flex flex-row">
                    <div className="w-full md:w-1/2 mx-10 ">
                      <Card
                        sx={{
                          maxWidth: 345,
                          background: "#306c74",
                          borderRadius: "15px",
                        }}
                      >
                        <CardMedia
                          sx={{ height: 140 }}
                          image={Image2}
                          title="Flood Relief"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Flood RELIEF
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Loss of household incomes, assets, rising food
                            prices, and disease outbreaks are impacting the most
                            vulnerable groups. Women have suffered notable
                            losses of their livelihoods, particularly those
                            associated with agriculture and livestock.
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            style={{
                              color: "black",
                              background: "#3be7e7",
                              borderRadius: "20px",
                            }}
                            size="medium"
                          >
                            Donate Now
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div class="w-full md:w-1/2 ">
                      <Card
                        sx={{
                          maxWidth: 345,
                          background: "#306c74",
                          borderRadius: "15px",
                        }}
                      >
                        <CardMedia
                          sx={{ height: 140 }}
                          image={Image2}
                          title="Flood Relief"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Flood RELIEF
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Loss of household incomes, assets, rising food
                            prices, and disease outbreaks are impacting the most
                            vulnerable groups. Women have suffered notable
                            losses of their livelihoods, particularly those
                            associated with agriculture and livestock.
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            style={{
                              color: "white",
                              background: "#6c9cb4",
                              borderRadius: "20px",
                            }}
                            size="medium"
                          >
                            Donate Now
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div class="w-full md:w-1/2 ">
                      <Card
                        sx={{
                          maxWidth: 345,
                          background: "#306c74",
                          borderRadius: "15px",
                        }}
                      >
                        <CardMedia
                          sx={{ height: 140 }}
                          image={Image2}
                          title="Flood Relief"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Flood RELIEF
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Loss of household incomes, assets, rising food
                            prices, and disease outbreaks are impacting the most
                            vulnerable groups. Women have suffered notable
                            losses of their livelihoods, particularly those
                            associated with agriculture and livestock.
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            style={{
                              color: "white",
                              background: "#6c9cb4",
                              borderRadius: "20px",
                            }}
                            size="medium"
                          >
                            Donate Now
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
          </>
        )}
        <ConfigProvider locale={en_US}>
          <ModalForm
            title={"Update Profile"}
            width={"400px"}
            visible={this.state.isModalVisible}
            onVisibleChange={this.handleModalVisibleChange}
            onFinish={async (values) => {
              let success = await this.handleUpdateProfile(
                "updateVolunteer",
                this.state.currentUserDetails[0]._id,
                values
              );
              if (success) {
                message.info("Updated Success");
                this.setState({
                  isModalVisible: false,
                  currentUserDetails: [
                    { ...this.state.currentUserDetails[0], ...values },
                  ],
                });
                console.log(success);
                this.formRef.current.resetFields();
              }
            }}
            formRef={this.formRef}
          >
            <ProFormText
              rules={[
                {
                  required: true,
                  message: "Full Name ?",
                },
              ]}
              width="md"
              label="Full Name"
              name="fullname"
            />
            <ProFormText
              rules={[
                {
                  required: true,
                  message: "Phone ?",
                },
              ]}
              width="md"
              label="Phone"
              name="phone"
            />
            <ProFormText
              rules={[
                {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  required: true,
                  message: "Email ?",
                },
              ]}
              width="md"
              label="Email"
              name="email"
            />
            <ProFormText
              rules={[
                {
                  required: true,
                  message: "Address ?",
                },
              ]}
              width="md"
              label="Address"
              name="address"
            />
          </ModalForm>
        </ConfigProvider>
        <ConfigProvider locale={en_US}>
          <ModalForm
            title={"Update Profile"}
            width={"400px"}
            visible={this.state.isModalVisible2}
            onVisibleChange={this.handleModalVisibleChange2}
            onFinish={async (values) => {
              let success = await this.handleUpdateProfile(
                "updateNGO",
                this.state.currentNgoDetails[0]._id,
                values
              );
              if (success) {
                message.info("Updated Success");
                this.setState({
                  isModalVisible2: false,
                  currentNgoDetails: [
                    { ...this.state.currentNgoDetails[0], ...values },
                  ],
                });
                console.log(success);
                this.formRef.current.resetFields();
              }
            }}
            formRef={this.formRef}
          >
            <ProFormText
              rules={[
                {
                  required: true,
                  message: "Full Name ?",
                },
              ]}
              width="md"
              label="Ngo Name"
              name="ngoName"
            />
            <ProFormText
              rules={[
                {
                  required: true,
                  message: "Phone ?",
                },
              ]}
              width="md"
              label="Phone"
              name="phone"
            />
            <ProFormText
              rules={[
                {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  required: true,
                  message: "Email ?",
                },
              ]}
              width="md"
              label="Email"
              name="email"
            />
            <ProFormText
              rules={[
                {
                  required: true,
                  message: "Address ?",
                },
              ]}
              width="md"
              label="No Branches"
              name="branches"
            />
          </ModalForm>
        </ConfigProvider>
      </div>
    );
  }
}
export default Dashboard;
