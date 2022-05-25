import {
    Stack,
    Group, Text, Avatar,
    Grid
} from "@mantine/core";
import _ from "lodash";

export const Summary = ({ topic }) => {
    return (
        <Grid
            columns={7}
            sx={(theme) => ({
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[2],
                padding: "5px",
                width: "800px",
                borderRadius: "10px"
            })}
        >
            <Grid.Col span={2}>
                <Stack>
                    <Text>Created</Text>
                    <Group>
                        <Avatar radius="lg" src={topic[0].user.avatar} />
                        {topic[0].date}
                    </Group>
                </Stack>
            </Grid.Col>
            <Grid.Col span={1}>
                <Stack>
                    <Text>Last Reply</Text>
                    {topic[1].date}
                </Stack>
            </Grid.Col>
            <Grid.Col span={1}>
                <Stack>
                    <Text>Reply Count:</Text>
                    <Text>{topic.length}</Text>
                </Stack>
            </Grid.Col>
            <Grid.Col span={1}>
                <Text>Views:</Text>
                <Text>{topic[0].views}</Text>
            </Grid.Col>
            <Grid.Col span={1}>
                <Text>Users:</Text>
                <Text>{_.uniqBy(topic, "user.Username").length}</Text>
            </Grid.Col>
            <Grid.Col span={1}>
                <Text>Likes</Text>
                <Text>
                    {topic.reduce(
                        (total, currentValue) => (total += currentValue.likes),
                        0
                    )}
                </Text>
            </Grid.Col>
        </Grid>
    );
};
