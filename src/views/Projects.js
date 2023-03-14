import React, { useEffect, useState } from "react";
import ProTable from "@ant-design/pro-table";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import en_US from 'antd/locale/en_US';
import { ConfigProvider, Upload, message, Image, Form } from 'antd';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-form";
import { DeleteOutlineRounded, InboxOutlined } from "@mui/icons-material";
import axios from "axios";
import moment from "moment";
import ArrowDropDownCircleTwoToneIcon from '@mui/icons-material/ArrowDropDownCircleTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
function Project() {

  const [createModalVisible, handleModalVisible] = useState(false);
  const [createModalVisible2, handleModalVisible2] = useState(false);
  const [updateModal, setUpdateModal] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let response = await fetch("/getVolunteers", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    const activeVolunteers = json.filter(volunteer => volunteer.activeStatus == "true");
    const volunteers = activeVolunteers.map((volunteer) => volunteer.fullname);
    setData(volunteers);
    console.log("volunteers", volunteers);


    let responce = await fetch("/getNGO", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const json2 = await responce.json();
    let activeNgo = json2.filter(ngo => ngo.activeStatus === "true");
    let ngos = activeNgo.map((ngo) => ngo.ngoName);
    setData2(ngos);
  };

  const handleDelete = async (id) => {
    const user = window.localStorage.getItem("user");
    if (user && user === "Admin") {
      const response = await fetch(`deleteProject/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        message.success('Project deleted successfully');
      } else {
        message.error('Failed to delete project');
      }
    }
    else {
      message.info("Access Denied")
    }
  }

  const handleAdd = async (data) => {
    console.log("Adding Project");
    const user = window.localStorage.getItem("user");
    const payload = {
      projectName: data.projectName,
      ngo: data.ngo,
      uploadDate: new Date().toISOString(),
      description: data.description,
      isActive: user === "Admin" ? true : false,
      vol: data.vol
    };
    if (user && (user === "Admin" || user === "Ngo")) {
      try {
        const res = await fetch('/createProject', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (res.status === 400 || !data) {
          message.error("Already exists");
        } else {
          message.success("Registered successfully");
        }
      } catch (error) {
        form.resetFields();
        message.error("Something went wrong");
        console.log(error);
        return false;
      }
      return true;
    } else {
      message.info("Access denied");
    }
  };
  const UpdateStatusProject = async (record) => {
    try {
      const response = await axios.put(`updateProject/${record._id}`, {
        ...record,status: record.status === "Complete" ? true : false  
      });

      if (response.status === 200) {
        message.success("Updated Successfully");
        handleModalVisible2(false);

      } else {
        message.error("Update Later");
        handleModalVisible2(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      valueType: "text",
    },
    {
      title: "NGO",
      dataIndex: "ngo",
      valueType: "text",
    },
    {
      title: "Uploaded ON",
      dataIndex: "uploadDate",
      render: (text, record, _, action) => moment(record.uploadDate).format('MMMM D, YYYY'),
    },
    {
      title: "Description",
      dataIndex: "description",
      valueType: "text",
    },
    {
      title: "Volunteers",
      dataIndex: "vol",
      valueType: "avatar",
      render: (text, record, _, action) => {

        const handleMenuOpen = (event) => {
          setAnchorEl(event.currentTarget);
        };

        const handleMenuClose = () => {
          setAnchorEl(null);
        };

        return (
          <>
            <IconButton onClick={handleMenuOpen}>
              <ArrowDropDownCircleTwoToneIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {record.vol.map((volunteer, index) => (
                <MenuItem key={volunteer}>{volunteer}</MenuItem>
              ))}
            </Menu>
          </>
        );
      },
    },
    {
      title: "isActive",
      dataIndex: "isActive",
      hideInForm: true,
      valueEnum: {
        true: {
          text: "acitve",
          status: "Success",
        },
        false: {
          text: "inActive",
          status: "Error",
        },
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      hideInForm: true,
      valueEnum: {
        true: {
          text: "complete",
          status: "Success",
        },
        false: {
          text: "InComplete",
          status: "Error",
        },
      },
    },
    {
      title: "Options",
      dataIndex: "option",
      valueType: "option",
      render: (text, record, _, action) => {

        const handleMenuOpen2 = (event) => {
          setAnchorEl2(event.currentTarget);
        };

        const handleMenuClose2 = () => {
          setAnchorEl2(null);
        };

        return (
          <>
            <IconButton onClick={handleMenuOpen2}>
              <SettingsTwoToneIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl2}
              open={Boolean(anchorEl2)}
              onClose={handleMenuClose2}
            >
              <MenuItem>
                <IconButton
                  onClick={() => {
                    handleModalVisible2(true);
                    setUpdateModal(record)
                  }}
                >
                  <TuneTwoToneIcon color="primary" /><h6> Edit</h6>
                </IconButton >
              </MenuItem>
              <MenuItem>
                <IconButton
                  onClick={() => {
                    handleDelete(record._id);
                  }}
                >
                  <DeleteOutlineRounded color="error" /> Delete
                </IconButton >
              </MenuItem>
            </Menu>
          </>
        );
      },
    }
  ]

  return (

    <div>
      <ConfigProvider locale={en_US}>
        <ProTable
          style={{ margin: "4rem" }}
          headerTitle={"Projects"}
          pagination={{ defaultPageSize: 4 }}
          rowKey="id"
          search={{
            labelWidth: 120,
          }}
          request={
            async (params, sort, filter) => {
              try {
                const response = await fetch('/getProjects', {
                  method: "GET",
                  headers: { "Content-Type": "application/json" }
                })
                const json = await response.json();
                const activeProject = json.filter((project) => project.isActive == true)
                console.log(activeProject);
                return {
                  data: activeProject,
                  success: response.status === 200
                };
              } catch (error) {
                console.error(error);
                return {
                  data: [],
                  success: false
                };
              }
            }
          }
          // search={false}
          toolBarRender={() => {
            return [
              <Button
                style={{ background: "skyblue" }}
                type="primary"
                key="primary"
                onClick={() => {
                  handleModalVisible(true);
                }}
              >
                <AddOutlinedIcon /> New
              </Button>,
            ]
          }
          }
          columns={columns}
        />
        <ModalForm
          title={"Add Project"}
          width={"400px"}
          visible={createModalVisible}
          onVisibleChange={handleModalVisible}
          onFinish={async (values) => {
            let success = await handleAdd(values);
            if (success) {
              handleModalVisible(false);
            }
          }}
          form={form}
        >
          <ProFormText
            rules={[
              {
                required: true,
                message: "Project Name ?",
              },
            ]}
            width="md"
            label="Project Name"
            name="projectName"
          />
          <ProFormSelect
            name="ngo"
            label="Select Ngo"
            options={data2}
            placeholder="Choose Ngo"
            width="md"
            rules={[{ required: true, message: "Kindly select Ngo!" }]}
          />
          <ProFormText
            rules={[
              {
                required: true,
                message: "Description ?",
              },
            ]}
            width="md"
            label="Description"
            name="description"
          />
          <ProFormSelect
            width="md"
            name="vol"
            label="Select Volunteers"
            mode="multiple"
            options={data}
            placeholder="Choose volunteers"
            rules={[{ required: true, message: "Please select atleast one!" }]}
          />
        </ModalForm>


        <ModalForm
          title={"Update Project"}
          width={"400px"}
          initialValues={updateModal}
          visible={createModalVisible2}
          onVisibleChange={handleModalVisible2}
          onFinish={async (values) => {
            let success = await UpdateStatusProject(values);
            if (success) {
              handleModalVisible2(false);
            }
          }}
          form={form}
        >
          <ProFormText
            width="md"
            label="Project Id"
            name="_id"
            disabled={true}
          />
          <ProFormText
            rules={[
              {
                required: true,
                message: "Project Name ?",
              },
            ]}
            width="md"
            label="Project Name"
            name="projectName"
          />
          <ProFormText
            rules={[
              {
                required: true,
                message: "NGO ?",
              },
            ]}
            width="md"
            label="NGO"
            name="ngo"
          />
          <ProFormText
            rules={[
              {
                required: true,
                message: "Description ?",
              },
            ]}
            width="md"
            label="Description"
            name="description"
          />
          <ProFormSelect
            name="status"
            label="Update Status"
            options={["InComplete","Complete"]}
            placeholder="Choose status"
            rules={[{ required: true, message: "Please select status!" }]}
          />
          <ProFormSelect
            name="vol"
            label="Select Volunteers"
            mode="multiple"
            options={data}
            placeholder="Choose volunteers"
            rules={[{ required: true, message: "Please select atleast one!" }]}
          />
        </ModalForm>
      </ConfigProvider>
    </div>
  );
}

export default Project;