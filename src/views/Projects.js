import React from "react";
import ProTable from "@ant-design/pro-table";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button, Dialog, DialogContent, InputAdornment, TextField } from "@mui/material";
import en_US from 'antd/locale/en_US';
import { ConfigProvider, Upload } from 'antd';
import { Formik, Form } from "formik";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { ModalForm, ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { InboxOutlined } from "@mui/icons-material";


export default class Project extends React.Component {
  constructor() {
    super();
    this.state = {
      createModalVisible: false

      // handleModalVisible
    }
    this.Dragger = Upload;
    this.columns = [
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
        valueType: "avatar",
      },
      {
        title: "Description",
        dataIndex: "Datdescription",
        valueType: "text",
      },
      {
        title: "Published",
        dataIndex: "published",
        hideInForm: true,
        valueEnum: {
          true: {
            text: "Published",
            status: "Success",
          },
          false: {
            text: "Unpublished",
            status: "Error",
          },
        },
      },
      {
        title: "Options",
        dataIndex: "option",
        valueType: "option",
      },
    ]
  }
  handleModalVisible() {
    this.setState({ createModalVisible: false })
  }
  render() {
    return (

      <div>
        <ConfigProvider locale={en_US}>
          <ProTable
            style={{ margin: "4rem" }}
            headerTitle={"Projects"}
            rowKey="id"
            search={{
              labelWidth: 120,
            }}
            // search={false}
            toolBarRender={() => {
              return [
                <Button
                  style={{ background: "skyblue" }}
                  type="primary"
                  key="primary"
                  onClick={() => {
                    this.setState({ createModalVisible: true });
                  }}
                >
                  <AddOutlinedIcon /> New
                </Button>,
              ]
            }
            }
            columns={this.columns}
          />
          <ModalForm
            title={"Add Project"}
            width="400px"
            visible={this.state.createModalVisible}
            onVisibleChange={this.handleModalVisible.bind(this)}
            onFinish={async (values) => {
              console.log("onFinish")
              // const formData = new FormData();
              // //formData.append('file', typeof item === 'object' ? JSON.stringify(item) : item);
              // formData.append("file", imageFile);
              // console.log("values")
              // console.log(values)
              // console.log("formData")
              // console.log(formData);
              // for ( var key in values ) {
              //   formData.append(key, values[key]);
              // }
              // console.log("formData")
              // console.log(formData);
              let success = true;
              if (success) {
                this.handleModalVisible();
              }
            }}
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
              name="name"
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
                  message: "Uplaod_Date ?",
                },
              ]}
              width="md"
              label="Uplaod_Date"
              name="date"
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
            {/* <ProFormSelect
            name="isActive"
            label="Active"
            options={["Yes", "No"]}
            placeholder="Select a Status"
            rules={[{ required: true, message: "Please select Active Status!" }]}
          /> */}
            <ProFormSelect
              name="isPublished"
              label="Published"
              options={["Yes", "No"]}
              placeholder="Select yes if published"
              rules={[{ required: true, message: "Please select yes or no!" }]}
            />
            {/* <Upload accept="image/*" multiple={false}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag image to upload</p>
              <p className="ant-upload-hint">lender logo.</p>
            </Upload> */}
            {/*<ProFormTextArea width="md" name="desc" />*/}
          </ModalForm>
        </ConfigProvider>
        {/* <Dialog
          open={this.state.createModalVisible}
          onClose={()=>this.setState({createModalVisible:false})}
        >
          <DialogContent>
          <Formik className="mx-auto sm:mx-0 sm:my-0"
                            initialValues={{ email: '', password: '' }}
                            onSubmit={(values, { setSubmitting }) => {
                                // handle form submission here
                            }}
                        >
                            {
                                ({ isSubmitting, handleChange, values }) => (
                                    <Form>
                                        <TextField
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircleRoundedIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            size='small'
                                            type="text"
                                            name="name"
                                            placeholder="FullName / NGO_Name*"
                                            onChange={handleChange}
                                            value={values.name}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                        <TextField
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocalPhoneRoundedIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            size='small'
                                            type="text"
                                            name="phone"
                                            placeholder="Phone*"
                                            onChange={handleChange}
                                            value={values.phone}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                        <TextField
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocationOnRoundedIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            size='small'
                                            type="text"
                                            name="address"
                                            placeholder="Address*"
                                            onChange={handleChange}
                                            value={values.address}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                        <TextField
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailRoundedIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            size='small'
                                            type="email"
                                            name="email"
                                            placeholder="Email*"
                                            onChange={handleChange}
                                            value={values.email}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                        <TextField
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockRoundedIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            size='small'
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            onChange={handleChange}
                                            value={values.password}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                        <TextField
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockRoundedIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            size='small'
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm Password*"
                                            onChange={handleChange}
                                            value={values.confirmPassword}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                        <Button
                                            size='small'
                                            style={{ width: "50%" ,backgroundColor:"#1e2950"}}
                                            type="submit"
                                            variant="contained"
                                            disabled={isSubmitting}
                                            fullWidth
                                        >
                                            Log in
                                        </Button>
                                    </Form>

                                )
                            }
                        </Formik>
          </DialogContent>
        </Dialog> */}

      </div>
    );
  }

}