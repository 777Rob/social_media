import { Table, Image, Avatar } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom"

const DisplayTopics = ({ topics = [] }) => {
  const navigate = useNavigate();
  const {address} = useParams();

  const rows = topics.map((element) => (
    <tr
      key={element.topic}
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/Community/${address}/topic/${element.topic}`)}
    >
      <td>{element.topic}</td>
      <td style={{ display: "flex", alignItems: "center" }}>
        {element.users.slice(0, 5).map((user) => (
          <Avatar size={40} radius="lg" src={user.avatar} />
        ))}
      </td>
      <td>{element.replyCount}</td>
      <td>{element.viewCount}</td>
      <td>{element.lastActivity}</td>
    </tr>
  ));

  return (
    <Table verticalSpacing="md" fontSize="lg" striped highlightOnHover>
      <thead>
        <tr>
          <th>Topic</th>
          <th>Users</th>
          <th>Replies</th>
          <th>Views</th>
          <th>Activity</th>
        </tr>
      </thead>
      <tbody>{rows && rows}</tbody>
    </Table>
  );
};

export default DisplayTopics;
