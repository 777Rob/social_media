import { Text, Stepper } from "@mantine/core";
import { Categories } from "data/Categories/categories";
import { MultiSelect } from "@mantine/core";

// In this step ask user to select topics that user is interested 
// These categories will be used for advertising and ad rewards 
// as well as community recommendations

const StepOne = ({ selectedCategories, setSelectedCategories }) => {
    return <Stepper.Step
        label="First step"
        description="Select topic you are interested in"
    >
        Select topic you are interested in.

        {/* Categories for selection are taken from Categories object */}
        <MultiSelect
            data={Categories.map((category, i) => ({
                value: i,
                label: (
                    <Text>
                        {category.icon}
                        {category.name}
                    </Text>
                )
            }))}
            value={selectedCategories}
            onChange={setSelectedCategories}
            label="Pick categories you would like to follow:"
            placeholder="Pick all that you like" />
    </Stepper.Step>;
};

export default StepOne;