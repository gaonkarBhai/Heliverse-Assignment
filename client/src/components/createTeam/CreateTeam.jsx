import { Button, Flex, Input, Modal, Typography, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../toolkit/users/usersSlice";
import { createAsyncTeam } from "../../toolkit/teams/teamslice";

const CreateTeam = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [options, setOptions] = useState([]);

  const handleCreate = () => {
    console.log({ name: teamName, members });
    dispatch(createAsyncTeam({ name: teamName, members }));
    setTeamName("");
    setMembers([]);
    setShowModal(false);
  };

  const existingUsers = useSelector(getAllUsers);

  useEffect(() => {
    setOptions(
      existingUsers
        .filter((user) => user.available)
        .map((user) => ({
          label: user.first_name,
          value: user._id,
        }))
    );
  }, [existingUsers]);

  const handleChange = (value) => {
    console.log(value);
    const selectedUsers = existingUsers.filter((user) =>
      value.includes(user._id)
    );
    const uniqueDomains = [
      ...new Set(selectedUsers.map((user) => user.domain)),
    ];

    const filteredOptions = existingUsers
      .filter((user) => !uniqueDomains.includes(user.domain))
      .map((user) => ({
        label: user.first_name, // <- Here you need to use user.first_name
        value: user._id,
      }));

    setOptions(filteredOptions);
    console.log(filteredOptions);
    setMembers(value);
  };
  return (
    <>
      <Button className="flex gap-1" onClick={() => setShowModal(true)}>
        <Typography className="flex gap-1">
          <Plus />
          Create Team
        </Typography>
      </Button>
      <Modal
        title="Create Team"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={
          <>
            <Button onClick={() => handleCreate()}>create</Button>
          </>
        }
      >
        <Flex vertical gap={16}>
          <div>
            <Typography>First Name</Typography>
            <Input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div>
            <Typography>Members</Typography>
            <Space
              style={{
                width: "100%",
              }}
              direction="vertical"
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Select members"
                onChange={handleChange}
                options={options}
                // value={[...members]}
                onCancel={() => {
                  setShowModal(false);
                  setMembers(""); 
                  setSelectedDomain("");
                }}
                optionLabelProp="label"
              />
            </Space>
          </div>
        </Flex>
      </Modal>
    </>
  );
};

export default CreateTeam;
