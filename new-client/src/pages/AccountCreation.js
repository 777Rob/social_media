import { useMoralis } from "react-moralis";
import { Text, BackgroundImage, Center, Grid, Checkbox } from "@mantine/core";
import { Categories } from "data/Categories/categories";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MultiSelect } from "@mantine/core";

const AccountCreation = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  let error;

  const updateCategories = () => {
    if (categories.length < 2) {
      error = "Please select at least 2 categories";
    }
    user.set("Categories", categories);
  };

  return (
    <div>
      <Text sx={{ fontSize: "24px", fontWeight: "bold" }}>
        Account Creation
      </Text>
      {/* <Grid>
        {Categories.map((category) => (
          <Grid.item span={3}>
            <BackgroundImage
              src={category.image}
              radius="md"
              alt={category.name}
              placeholder={<Text align="center">{category.name}</Text>}
              withPlaceholder
            >
              <Center p="md">
                <Checkbox label="I agree to sell my privacy" />
                <Text sx={{ width: "400px" }} align="center">
                  {category.name}
                </Text>
              </Center>
            </BackgroundImage>
          </Grid.item>
        ))}
      </Grid> */}

      <MultiSelect
        data={Categories.map((category) => ({
          value: (
            <Text>
              {category.icon}
              {category.name}
            </Text>
          ),
          label: category.name,
        }))}
        
        label="Pick categories you would like to follow:"
        placeholder="Pick all that you like"
      />
    </div>
  );
};

export default AccountCreation;
